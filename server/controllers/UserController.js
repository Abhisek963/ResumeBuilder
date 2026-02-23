import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// ==========================
// Generate JWT Token
// ==========================
const generateToken = (userID) => {
  return jwt.sign(
    { userID },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// ==========================
// Register User
// POST: /api/users/register
// ==========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};


// ==========================
// Login User
// POST: /api/users/login
// ==========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password"
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist with this email"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = generateToken(existingUser._id);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
      },
      token
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};


// ==========================
// Get User By ID (Protected)
// GET: /api/users/data
// ==========================
export const getUserById = async (req, res) => {
  try {
    const userId = req.userID;

    const foundUser = await User.findById(userId).select("-password");

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      user: foundUser
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};


// ==========================
// Get User Resumes (Protected)
// GET: /api/users/resumes
// ==========================
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userID; // IMPORTANT: match protect middleware

    const resumes = await Resume.find({ userId });

    return res.status(200).json({
      message: "User resume fetched successfully",
      resumes
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};