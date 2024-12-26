import jwt from "jsonwebtoken";
import { User } from "../models/userdata.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check if the token exists in the cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided. Please log in." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};


export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
