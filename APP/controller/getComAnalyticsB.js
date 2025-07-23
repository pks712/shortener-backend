import UrlSchema from "../models/shoturl.model.js";

export const getCombinedAnalyticsBrowser = async (req, res) => {
  const urls = await UrlSchema.find();

  const browsers = {};

  urls.forEach(url => {
    const map = url.browsers instanceof Map
      ? Object.fromEntries(url.browsers)
      : url.browsers;

    Object.entries(map || {}).forEach(([browser, count]) => {
      browsers[browser] = (browsers[browser] || 0) + count;
    });
  });

  res.json({ browsers }); 
};
