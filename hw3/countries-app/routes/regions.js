const router = require('express').Router();
const { getAllCountries } = require('../services/countriesApi');

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllCountries();

    // group country names by region
    const grouped = data.reduce((acc, c) => {
      const region = (c.region || '').trim();
      if (!acc[region]) acc[region] = [];
      acc[region].push(c.name);
      return acc;
    }, {});

    // build a sorted array: regions A-Z,
    const regions = Object.entries(grouped)
      .map(([name, countries]) => ({
        name,
        count: countries.length,
        countries: countries.sort((a, b) => a.localeCompare(b)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    res.render('regions', {
      title: 'Countries by Region',
      total: data.length,
      regions,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
