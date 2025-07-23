import UrlSchema from "../../../models/shoturl.model.js";

export const deleteShortUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const deletedUrl = await UrlSchema.findOneAndDelete({ shortId });

    if (!deletedUrl) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.status(200).json({ message: "Short URL deleted successfully", url: deletedUrl });
  } catch (err) {
    res.status(500).json({ message: "Error deleting URL", error: err.message });
  }
};
