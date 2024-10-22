import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

//imports
import { connectToMongoDB } from "./config/DBconnect.js";
import userRoute from "./routes/userRoute.js";
import staticRoute from "./routes/staticRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//DB connection
connectToMongoDB(process.env.MONGODB_URL);

//static files
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//inbuilt middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
