import express from "express";
import validateUrl from "../middelware/validateUrl.js";
import createUrl from "../controller/urlController.js";
import { GetData } from "../controller/Getdata.js";
import { getStats } from "../controller/getStats.js";
import { getCombinedAnalytics } from "../controller/analytics/analytics.js";
import { getReferrerData } from "../controller/analytics/referrer.js";
import { getCombinedAnalyticsBrowser } from "../controller/getComAnalyticsB.js";
import { getCountryStats } from "../controller/analytics/getcountry.js";
import openShortUrl from "../controller/oprnShortUrl.js";

const route = express.Router();

// ✅ Analytics
route.get("/geturl", GetData);
route.post("/shorturl", validateUrl, createUrl);
route.get("/analytics", getCombinedAnalytics); 
route.get("/browser", getCombinedAnalyticsBrowser); 
route.get("/country", getCountryStats); 
route.get("/referre", getReferrerData);
route.get("/stats/:shortId", getStats);

// ✅ ⚠️ Put this at the END for redirection
route.get("/:shortId", openShortUrl);

export default route;
