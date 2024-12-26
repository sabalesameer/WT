import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import cardRoute from "./routes/cardRout.js";
import { verifyToken } from "./middleWare/authUser.js";
import { logout, login, register,myProfile } from "./controll/userConterol.js";
import {getOneCard} from "./controll/cardControl.js"

dotenv.config();



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/uploads",
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000, // Adjust timeout as needed
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
    
    // Start server only after successful database connection
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process on connection failure
  });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/cards", cardRoute);
app.get("/api/users/logout", verifyToken, logout);
app.post("/api/users/login", login);
app.post("/api/users/register", register);
app.get("/api/cards/getone/",getOneCard)
app.get("/api/cards/profile",myProfile)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error details:", err);
  res.status(500).json({ message: "Something went wrong!" });
});
