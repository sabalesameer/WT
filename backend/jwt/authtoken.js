import jwt from "jsonwebtoken";
import { User } from "../models/userdata.js"; // Ensure the path is correct

// Function to create a JWT token and save it as a secure cookie
export const createTokenAndSaveCookies = (user, res) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Prevent CSRF attacks
    });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token creation failed");
  }
};

// Middleware to verify a JWT token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "No token provided. Please log in." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Find user by decoded ID

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach the user object to req.user
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Authentication failed." });
    }
    return res.status(500).json({ message: "Authentication failed." });
  }
};
