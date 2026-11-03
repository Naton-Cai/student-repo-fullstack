require("dotenv").config();

const BASE = "https://api.restcountries.com/countries/v5";
const FIELDS = [
  "names.common",
  "codes.alpha_3",
  "capitals",
  "population",
  "flag.url_svg",
  "flag.description",
  "region",
  "leaders",
].join(",");

let cache = null;

async function fetchPage(offset) {
  const url = `${BASE}?limit=100&offset=${offset}&response_fields=${FIELDS}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.REST_COUNTRIES_API_KEY}` },
  });
  const body = await res.json();

  if (!res.ok || !body?.data?.objects) {
    console.error("REST Countries error:", res.status, body);
    throw new Error(`REST Countries returned ${res.status}`);
  }
  return body.data;
}

// Turn the raw API record into a flat, safe shape the routes/views can use
function normalize(c) {
  const leaderObj = Array.isArray(c.leaders)
    ? c.leaders.find((l) => l && l.name)
    : null;

  return {
    name: c.names?.common ?? "Unknown",
    code: c.codes?.alpha_3 ?? null,
    capital:
      c.capitals?.map((cap) => cap?.name).filter(Boolean).join(", ") ||
      "No capital",
    population: c.population ?? 0,
    flagUrl: c.flag?.url_svg ?? null,
    flagAlt: c.flag?.description || `Flag of ${c.names?.common ?? "country"}`,
    region: c.region || "Uncategorized",
  };
}

async function getAllCountries() {
  if (cache) return cache;

  const all = [];
  let offset = 0;
  while (true) {
    const data = await fetchPage(offset);
    all.push(...data.objects);
    if (!data.meta?.more) break;
    offset += data.objects.length;
  }

  cache = all.map(normalize); // only cached if every page succeeded
  return cache;
}

module.exports = { getAllCountries };