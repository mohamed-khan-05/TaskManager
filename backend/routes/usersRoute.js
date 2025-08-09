const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const Users = db.Users;

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});

// Register new user
router.post("/", async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({ error: "Fill all fields" });
  }

  try {
    const existingUser = await Users.findOne({ where: { email: data.email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await Users.create({
      email: data.email,
      password: hashedPassword,
      isAdmin: false,
    });

    res.status(201).json({ message: "Successfully created user" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({ error: "Fill all fields" });
  }

  try {
    const existingUser = await Users.findOne({ where: { email: data.email } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(data.password, existingUser.password);
    if (isValid) {
      req.session.user = {
        id: existingUser.id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      };
      res
        .status(200)
        .json({ message: "Login successful", isAdmin: existingUser.isAdmin });
    } else {
      res.status(401).json({ message: "Incorrect credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check login status
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout user
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("userId", { secure: false, httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
