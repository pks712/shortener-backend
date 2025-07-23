import jwt from "jsonwebtoken";
import UsersSchema from "../models/users.model.js";

const verifyToken= async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UsersSchema.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;  
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
