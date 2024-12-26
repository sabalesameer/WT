import bcrypt from "bcryptjs";
import { User } from "../models/userdata.js";
import jwt from 'jsonwebtoken';
import { createTokenAndSaveCookies } from "../jwt/authtoken.js";

// User registration controller
 // Adjust the path as per your project structure

// Register function

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate key error for email or phone if needed
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error: A user with this email already exists." });
    }

    // General error handler
    return res.status(500).json({
      message: "Internal server error during registration.",
      error: error.message,
    });
  }
};


// User login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Optionally, set token as an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};


// User logout controller
export const logout = (req, res) => {
  try {
    // Clear the token from cookies
    res.clearCookie("token", {
      httpOnly: true, // Make the cookie inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Ensure it works on HTTPS in production
    });

    // Respond with a success message
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// Fetch the logged-in user's profile
export const myProfile = async (req, res) => {
  try {
    const user = req.user; // Already attached by the verifyToken middleware
    res.status(200).json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all admins
export const getAdmin = async (req, res) => {
  try {
    const admins = await User.find({ roll: "admin" });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Get admin error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
