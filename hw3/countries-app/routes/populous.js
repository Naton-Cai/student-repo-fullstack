const router = require('express').Router();
const { getAllCountries } = require('../services/countriesApi');

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllCountries();
    const countries = data
      .filter((c) => c.population >= 50000000)
      .sort((a, b) => b.population - a.population); // sort by most populous
    res.render('populous', {
      title: 'Populous',
      countries,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
