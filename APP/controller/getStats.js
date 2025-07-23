import UrlSchema from "../models/shoturl.model.js";

export const getStats = async(req,res) =>{

const {shortId} =req.params;
try {
    const urlData = await UrlSchema.findOne({shortId});
if(!urlData){
    return res.status(404).json({ message: "Short URL not found"})
}


   res.status(200).json(urlData);

} catch (error) {
      res.status(500).json({ message: "Failed to fetch stats", error: err });
}
}