import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in adding user" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const checkedpassword = await bcrypt.compare(password, user.password);
    if (!checkedpassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "You are connected",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in getting connected" });
  }
});

export default router;
