const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
// http://localhost:5001/submit should return all the data the user entered

app.use(express.urlencoded({ extended: false }));

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
  const {
    username, email, comments, newsletter,
  } = req.body;
  const newsletterStatus = newsletter ? 'Yes' : 'No';

  res.status(200).type('html').send(`
    <p>Username: ${username}</p>
    <p>Email: ${email}</p>
    <p>Comments: ${comments}</p>
    <p>Newsletter sign up: ${newsletterStatus}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
