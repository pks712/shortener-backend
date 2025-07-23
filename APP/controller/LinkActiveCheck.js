// cronJobs/expireUrls.js
import cron from "node-cron";
import UrlSchema from "../models/shoturl.model.js";

export const expireOldUrls = () => {
  cron.schedule("*/10 * * * * *", async () => {
 
   const now = new Date();

  try {
    const result = await UrlSchema.updateMany(
      { expiredAt: { $lt: now }, isActive: true },
      { $set: { isActive: false } }
    );

  

    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} URLs expired and deactivated.`);
    }
  } catch (error) {
    console.error("Cron Error:", error);
  }
});

};
