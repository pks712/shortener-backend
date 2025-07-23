import UrlSchema from "../models/shoturl.model.js";
import geoip from "geoip-lite";
import requestIp from "request-ip";

const openShortUrl = async (req, res) => {
  const { shortId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  try {
    const urlData = await UrlSchema.findOne({ shortId });
    if (!urlData) return res.status(404).json({ message: "Short URL not found" });

    const now = new Date();
    if (urlData.expiredAt && urlData.expiredAt < now) {
      await urlData.save();
      return res.redirect("http://localhost:5173/expired");
    }

    // ✅ Total Clicks
    urlData.clicks += 1;

    // ✅ Referrer
    const ref = req.get("referer") || "Direct";
    urlData.referrers = urlData.referrers || new Map();
    const refCount = Number(urlData.referrers.get(ref)) || 0;
    urlData.referrers.set(ref, refCount + 1);
    urlData.markModified("referrers");

    // ✅ Daily Clicks
    urlData.dailyClicks = urlData.dailyClicks || new Map();
    const todayCount = Number(urlData.dailyClicks.get(today)) || 0;
    urlData.dailyClicks.set(today, todayCount + 1);
    urlData.markModified("dailyClicks");

    // ✅ Browser
    const agent = req.useragent;
    let browser = agent?.browser?.toLowerCase() || "unknown";
    if (browser.includes("chrome")) browser = "Chrome";
    else if (browser.includes("firefox")) browser = "Firefox";
    else if (browser.includes("safari")) browser = "Safari";
    else if (browser.includes("edge")) browser = "Edge";
    else browser = "Other";

    urlData.browsers = urlData.browsers || new Map();
    const browserCount = Number(urlData.browsers.get(browser)) || 0;
    urlData.browsers.set(browser, browserCount + 1);
    urlData.markModified("browsers");

    // ✅ Country
    const ip = requestIp.getClientIp(req);
    const geo = geoip.lookup(ip);
    const country = geo?.country || "Unknown";
    urlData.countries = urlData.countries || new Map();
    const countryCount = Number(urlData.countries.get(country)) || 0;
    urlData.countries.set(country, countryCount + 1);
    urlData.markModified("countries");

    await urlData.save();
    res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error("Error in openShortUrl:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default openShortUrl;
