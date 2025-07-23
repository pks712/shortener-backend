import UrlSchema from "../../../models/shoturl.model.js";

export const updateShortUrl = async (req, res) => {
  const { shortId } = req.params;
  const { newShortId } = req.body;

  try {
    const baseUrl = "http://localhost:8080";

    // Check if newShortId already exists in DB
    const alreadyExists = await UrlSchema.findOne({ shortId: newShortId });
    if (alreadyExists) {
      return res.status(400).json({ message: "Short ID already exists" });
    }

    // Find and update the URL
    const updatedUrl = await UrlSchema.findOneAndUpdate(
      { shortId },
      {
        $set: {
          shortId: newShortId,
          shortUrl: `${baseUrl}/${newShortId}`,
        },
      },
      { new: true }
    );
    if (!updatedUrl) {
      return res.status(404).json({ message: "Original short URL not found" });
    }

    res.status(200).json({ message: "Short URL updated", url: updatedUrl });
  } catch (err) {
    res.status(500).json({ message: "Error updating URL", error: err.message });
  }
};
