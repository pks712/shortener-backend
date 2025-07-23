import express from "express";
import { LoginValidation, RegisterValidation } from "../middelware/authvalidate.js";
import { Login, Signup } from "../controller/Auth/usersController.js";
import getUserData from "../controller/Auth/getUserData/getUserData.js";
import verifyToken from "../middelware/verifyToken.js";
import updateProfile from "../controller/Auth/getUserData/updateProfile.js";
import { deleteAccount, logout } from "../controller/Auth/delete-loggout/auth.delete.js";
import { changePassword } from "../controller/Auth/delete-loggout/changePassword.js";
import { updateShortUrl } from "../controller/Auth/getUserData/updateUrl.js";
import { deleteShortUrl } from "../controller/Auth/getUserData/deleteUrl.js";

const route = express.Router();

// ✅ Auth Routes
route.post("/register", RegisterValidation, Signup);
route.post("/login", LoginValidation, Login);
route.get("/getuser", verifyToken, getUserData);
route.patch("/update-profile", updateProfile);
route.delete("/delete-account", verifyToken, deleteAccount);
route.get("/logout", verifyToken, logout);
route.put("/change-password", verifyToken, changePassword);

// ✅ URL Management
route.patch("/short-url/:shortId", updateShortUrl);
route.delete("/shorturl-delete/:shortId", deleteShortUrl);

export default route;
