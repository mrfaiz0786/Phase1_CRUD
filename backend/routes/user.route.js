import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";

const router = express.Router();

/* =========================
   CREATE USER
========================= */
router.post("/", async (req, res) => {
  try {
    const { name, email ,password} = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    // email format check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const user = await User.create({ name, email,password });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

/* =========================
   READ USERS
========================= */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

/* =========================
   UPDATE USER
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const { name, email,password} = req.body;

    if (!name || !email || !password ) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email,password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

/* =========================
   DELETE USER
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // valid ID check
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;

