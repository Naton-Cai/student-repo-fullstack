const router = require("express").Router();
const { getAllCountries } = require("../services/countriesApi");

router.get("/", async (req, res, next) => {
  try {
    const data = await getAllCountries();

    // Group country names by region
    const grouped = {};
    for (const c of data) {
      const region = (c.region || "").trim() || "Uncategorized";
      (grouped[region] ??= []).push(c.name || "Unknown");
    }

    // Build a sorted array: regions A-Z, "Uncategorized" last, names A-Z
    const regions = Object.entries(grouped)
      .map(([name, countries]) => ({
        name,
        count: countries.length,
        countries: countries.sort((a, b) => a.localeCompare(b)),
      }))
      .sort((a, b) => {
        if (a.name === "Uncategorized") return 1;
        if (b.name === "Uncategorized") return -1;
        return a.name.localeCompare(b.name);
      });

    res.render("regions", {
      title: "Countries by Region",
      total: data.length,
      regions,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;