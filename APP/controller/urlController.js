import UrlSchema from "../models/shoturl.model.js";
 import { nanoid } from "nanoid"; 

 const createUrl =async (req, res)=>{
const {originalUrl} = req.body;
 
const today = new Date().toISOString().split("T")[0];
try {
const shortId = nanoid(6);

const newUrl = new UrlSchema({
    originalUrl,
    shortId,
    isActive:true,
   shortUrl : `${process.env.BASE_URL}/${shortId}`,
    expiredAt: new Date(Date.now() +  1 * 60 * 1000),
   dailyClicks: new Map([[today, 0]]) 
})
await newUrl.save();



res.status(201).json({
  id: newUrl._id,
  shortId: newUrl.shortId,
  originalUrl: newUrl.originalUrl,
  shortUrl: newUrl.shortUrl,
  clicks: newUrl.clicks,
  isActive: newUrl.isActive,
  createdAt: newUrl.createdAt,
   expiredAt: newUrl.expiredAt,
    dailyClicks: Object.fromEntries(newUrl.dailyClicks || new Map())
});

    
} catch (error) {
    res.status(500).json({message:"Internal server error"})
}

 }

 export default createUrl;