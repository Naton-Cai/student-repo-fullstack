require("dotenv").config();

const BASE = "https://api.restcountries.com/countries/v5";
const FIELDS = [
  "names.common",
  "capitals",
  "population",
  "flag.url_svg",
  "flag.description",
  "region",
  "currencies",
].join(",");

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

//parses the currencies since a country can have multiple currencies
function parseCurrencies(raw) {
  if (!raw) return [];
  const entries = Array.isArray(raw)
    ? raw.map((c) => [c?.code, c])
    : Object.entries(raw);
  return entries
    .filter(([, c]) => c)
    .map(([code, c]) => ({
      code: c.code ?? code ?? null,
      name: c.name ?? "Unknown",
      symbol: c.symbol ?? null,
    }));
}

// normalizes the API for use
function normalize(c) {
  return {
    name: c.names?.common ?? "Unknown",
    currencies: parseCurrencies(c.currencies),
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
  const all = [];
  let offset = 0;
  while (true) {
    const data = await fetchPage(offset);
    all.push(...data.objects);
    if (!data.meta?.more) break;
    offset += data.objects.length;
  }

  return all.map(normalize);
}

module.exports = { getAllCountries };