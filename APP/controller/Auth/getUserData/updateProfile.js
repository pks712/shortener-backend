// controller/Auth/updateProfile.js
import UsersSchema from "../../../models/users.model.js";
import jwt from "jsonwebtoken";

const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await UsersSchema.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default updateProfile;
