import UrlSchema from "../models/shoturl.model.js";

export const GetData = async (req, res) => {
 

  try {
    const urls = await UrlSchema.find();
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch URLs", error: err });
   
  }
};
