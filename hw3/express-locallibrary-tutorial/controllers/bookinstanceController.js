/* eslint-disable no-underscore-dangle */
const BookInstance = require('../models/bookinstance');
const { body, validationResult } = require('express-validator');
const Book = require('../models/book');

// Display list of all BookInstances.
exports.bookinstance_list = async (req, res) => {
  const allBookInstances = await BookInstance.find().populate('book').exec();

  res.render('bookinstance_list', {
    title: 'Book Instance List',
    bookinstance_list: allBookInstances,
  });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate('book')
    .exec();

  if (bookInstance === null) {
    // No results.
    const err = new Error('Book copy not found');
    err.status = 404;
    next(err);
    return;
  }

  res.render('bookinstance_detail', {
    title: 'Book:',
    bookinstance: bookInstance,
  });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async (req, res) => {
  const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

  res.render('bookinstance_form', {
    title: 'Create BookInstance',
    book_list: allBooks,
  });
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // Validate and sanitize fields.
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status').escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

      res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    }

    // Data from form is valid
    await bookInstance.save();
    res.redirect(bookInstance.url);
  },
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = async (req, res) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate('book')
    .exec();

  if (bookInstance === null) {
    res.redirect('/catalog/bookinstances');
    return;
  }

  res.render('bookinstance_delete', {
    title: 'Delete BookInstance',
    bookinstance: bookInstance,
  });
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = async (req, res) => {
  await BookInstance.findByIdAndDelete(req.params.id);
  res.redirect('/catalog/bookinstances');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = async (req, res, next) => {
  // Don't populate 'book' here: the form compares bookinstance.book
  // to each book's _id, which only matches while it's a plain ObjectId.
  const [bookInstance, allBooks] = await Promise.all([
    BookInstance.findById(req.params.id).exec(),
    Book.find({}, 'title').sort({ title: 1 }).exec(),
  ]);

  if (bookInstance === null) {
    const err = new Error('Book copy not found');
    err.status = 404;
    next(err);
    return;
  }

  res.render('bookinstance_form', {
    title: 'Update BookInstance',
    book_list: allBooks,
    selected_book: bookInstance.book.toString(),
    bookinstance: bookInstance,
  });
};

// Handle BookInstance update on POST.
exports.bookinstance_update_post = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status').escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  async (req, res) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();
      res.render('bookinstance_form', {
        title: 'Update BookInstance',
        book_list: allBooks,
        selected_book: req.body.book,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    }

    const updatedBookInstance = await BookInstance.findByIdAndUpdate(
      req.params.id,
      {
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        // null clears the date if the field was left empty
        due_back: req.body.due_back || null,
      },
      { new: true },
    );
    res.redirect(updatedBookInstance.url);
  },
];
