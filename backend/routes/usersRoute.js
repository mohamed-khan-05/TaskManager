const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const Users = db.Users;
const { sequelize } = db;

// Users
router.get("/", async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * from Users");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register
router.post("/", async (req, res) => {
  const data = req.body;
  const [existingUser] = await sequelize.query(
    "SELECT * FROM Users WHERE email = ?",
    {
      replacements: [data.email],
      type: sequelize.QueryTypes.SELECT,
    }
  );
  if (!data.email || !data.password) {
    return res.status(400).json({ error: "Fill all fields" });
  }
  if (existingUser) {
    return res.status(500).json({ error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.isAdmin = false;
    await Users.create(data);
    res.status(200).json({ message: "Successfully created user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return res.status(400).json({ error: "Fill all fields" });
  }
  const [existingUser] = await sequelize.query(
    "SELECT * FROM Users where email=?",
    {
      replacements: [data.email],
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const isValid = await bcrypt.compare(data.password, existingUser.password);
  if (isValid) {
    req.session.user = {
      id: existingUser.id,
      email: existingUser.email,
      password: existingUser.password,
      isAdmin: existingUser.isAdmin,
    };
    res
      .status(200)
      .json({ message: "Login successful", isAdmin: existingUser.isAdmin });
  } else {
    res.status(404).json({ message: "Incorrect credentials" });
  }
});

router.get("/login", async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("userId", { secure: false, httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
