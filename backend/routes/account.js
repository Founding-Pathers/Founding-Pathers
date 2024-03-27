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
    const { firstName, lastName, email, password } = req.body;
    // Check if the email is already registered
    const existingUser = await db_connect
      .collection("userAccount")
      .findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user instance
    const hashPassword = await bcrypt.hash(password, 12);
    // console.log(password);
    // console.log(hashPassword);
    const newUser = new User({ first_name: firstName, last_name: lastName, email, password: hashPassword, createdAt: new Date(), updatedAt: new Date() });
    // Save the user to the database
    await db_connect.collection("userAccount").insertOne(newUser);

    // Generate token using user's ID
    const token = createSecretToken(newUser._id);

    // Set the token as a cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400000,
    });

    // Respond with a success message or error message
    res
      .status(201)
      .json({ message: "User created successfully", success: true, newUser });
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

    const existingUser = await db_connect
      .collection("userAccount")
      .findOne({ email });

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    if (!existingUser) {
      return res.json("User does not exist");
    }

    const auth = await bcrypt.compare(password, existingUser.password);
    if (!auth) {
      res
        .status(401)
        .json("Unsuccessful login");
      next()
    }
    else{
    const token = createSecretToken(existingUser.email);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ message: "Success" });
  }
  } catch (error) {
    console.error(error);
  }
});

// logout user
router.post("/logout", (req, res) => {
  // console.log("Logging out user");
  res.clearCookie("token");
  res.redirect(200, "/logout");
});

module.exports = router;
