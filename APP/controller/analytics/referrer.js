// GET /api/analytics/referrers

import UrlSchema from "../../models/shoturl.model.js";

export const getReferrerData = async (req, res) => {
  const urls = await UrlSchema.find();
  const referrerStats = {};

  urls.forEach(url => {
    const refMap = url.referrers instanceof Map
      ? Object.fromEntries(url.referrers)
      : url.referrers;

    Object.entries(refMap || {}).forEach(([source, count]) => {
      referrerStats[source] = (referrerStats[source] || 0) + count;
    });
  });

  res.json({ referrers: referrerStats });
};
