import UsersSchema from "../../../models/users.model.js";


 export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // JWT से या session से user id लो

    await UsersSchema.findByIdAndDelete(userId); // User को DB से delete करो

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

// Route: GET /api/logout
 export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,         // ✅ dev में false रखो, prod में true
    sameSite: "Lax",       // ✅ dev में "Lax", prod में "None"
    path: "/",             // ✅ ये भी जरूरी हो सकता है
  });

  res.status(200).json({ message: "Logged out successfully" });
};


