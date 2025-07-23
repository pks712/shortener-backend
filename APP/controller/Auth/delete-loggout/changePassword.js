import bcrypt from 'bcrypt';
import UsersSchema from '../../../models/users.model.js';


export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await UsersSchema.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.clearCookie("token"); // Force logout
    return res.status(200).json({ message: "Password changed successfully. Please log in again." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to change password" });
  }
};
