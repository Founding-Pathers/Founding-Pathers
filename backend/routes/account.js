const express = require("express");
const User = require("../models/User");
const { createUser, getUserByEmail } = require("../models/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res, next) => {
  try {
    // Extract user data from the request body
    const { email, password } = req.body;
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user instance
    const hashPassword = await bcrypt.hash(password, 12);
    console.log(password);
    console.log(hashPassword);
    const newUser = new User({ email, password: hashPassword });
    // Save the user to the database
    await newUser.save();

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
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
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
