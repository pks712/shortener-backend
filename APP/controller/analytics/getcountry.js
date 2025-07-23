import UrlSchema from "../../models/shoturl.model.js";

export const getCountryStats = async (req, res) => {
  try {
    const urls = await UrlSchema.find();

    const combinedCountries = {};

    urls.forEach(url => {
      const countryMap = url.countries instanceof Map
        ? Object.fromEntries(url.countries)
        : url.countries || {}; // ✅ fallback to empty object

      Object.entries(countryMap).forEach(([country, count]) => {
        combinedCountries[country] = (combinedCountries[country] || 0) + count;
      });
    });

    res.json({ countries: combinedCountries });
  } catch (error) {
    console.error("Error fetching country stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
