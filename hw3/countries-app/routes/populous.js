const router = require('express').Router();
const { getAllCountries } = require('../services/countriesApi');

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllCountries();
    const MIN_POPULATION = 50000000;
    const countries = data
      .filter((c) => c.population >= MIN_POPULATION)
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
