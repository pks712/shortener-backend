import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import route from "./APP/routes/routes.js";
import useragent from "express-useragent";
import requestIp from 'request-ip';
import { expireOldUrls } from "./APP/controller/LinkActiveCheck.js";
import userRoute from "./APP/routes/user.router.js";
import cookieParser from "cookie-parser";
import openShortUrl from "./APP/controller/oprnShortUrl.js";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors({
  origin: 'https://shortener-frontend-rust.vercel.app/',
  credentials: true ,
}));
app.use(express.json());
app.use(useragent.express());
app.use(cookieParser());

app.use(requestIp.mw());

connectDB();



app.use("/api" ,route)
app.use("/api/user" ,userRoute);
app.get("/:shortId", openShortUrl);

expireOldUrls();



app.use((req, res, next) => {
res.status(404).json({ redirectTo: "/not-found" });

});



app.listen(PORT ,(req,res)=>{
    console.log(`server is running on port  ${PORT}`)
})