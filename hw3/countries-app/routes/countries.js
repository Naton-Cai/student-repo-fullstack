const router = require('express').Router();
const { getAllCountries } = require('../services/countriesApi');

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllCountries();
    const countries = data
      .map((c) => ({
        name: c.name,
        capital: c.capital,
        currencies: c.currencies,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    res.render('countries', { countries, title: 'Countries' });
  } catch (err) { next(err); }
});

module.exports = router;
