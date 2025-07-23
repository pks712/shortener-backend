import UrlSchema from "../../models/shoturl.model.js";

export const getCombinedAnalytics = async (req, res) => {
  const urls = await UrlSchema.find();

  // Date Range for clicks (2 days ago to 7 days ahead)
  const dateRange = getDateRange(-2, 7);
  const combinedClicks = {};
  const combinedReferrers = {};

  urls.forEach(url => {
    const dailyClicksMap = url.dailyClicks instanceof Map
      ? Object.fromEntries(url.dailyClicks)
      : url.dailyClicks;

    Object.entries(dailyClicksMap).forEach(([date, count]) => {
      if (dateRange[date] !== undefined) {
        combinedClicks[date] = (combinedClicks[date] || 0) + count;
      }
    });

    const refMap = url.referrers instanceof Map
      ? Object.fromEntries(url.referrers)
      : url.referrers;

    Object.entries(refMap || {}).forEach(([ref, count]) => {
      combinedReferrers[ref] = (combinedReferrers[ref] || 0) + count;
    });
  });

  const finalClicks = { ...dateRange };
  Object.entries(combinedClicks).forEach(([date, count]) => {
    finalClicks[date] = count;
  });

  res.json({
    dailyClicks: finalClicks,
    referrers: combinedReferrers
  });
};

function getDateRange(startOffset = -2, endOffset = 7) {
  const result = {};
  const today = new Date();

  for (let i = startOffset; i <= endOffset; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const key = date.toISOString().split("T")[0];
    result[key] = 0;
  }

  return result;
}
