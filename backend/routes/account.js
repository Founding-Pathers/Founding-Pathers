const express = require("express");
const User = require("../models/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const dbo = require("../db/conn");

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res, next) => {
  try {
    let db_connect = dbo.getDbLogging();
    // Extract user data from the request body
    const { email, password } = req.body;
    // Check if the email is already registered
    const existingUser = await db_connect.collection("userAccount").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user instance
    const hashPassword = await bcrypt.hash(password, 12);
    console.log(password);
    console.log(hashPassword);
    const newUser = new User({ email, password: hashPassword });
    // Save the user to the database
    await db_connect.collection("userAccount").insertOne(newUser);

    // Generate token using user's ID
    const token = createSecretToken(newUser._id);

    // Set the token as a cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 86400000,
    });

    // Respond with a success message or error message
    res
      .status(201)
      .json({ message: "User created successfully", success: true, user });
    next();
  } catch (error) {
    console.error("Error in user registration:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let db_connect = dbo.getDbLogging();

    const { email, password } = req.body;

    const existingUser = await db_connect.collection("userAccount").findOne({ email });

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    if (!existingUser) {
      return res.json({ message: "User does not exist" });
    }

    const auth = await bcrypt.compare(password, existingUser.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(existingUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    // returns that user has logged in successfully
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
