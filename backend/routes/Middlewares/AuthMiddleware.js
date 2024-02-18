const { getUserById } = require("../../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

// to check for user cookies, whether user authentication is valid using JWToken
router.post("/", async (req, res) => {
  try {
    // console.log("Starting user verification");

    // retrieval of token from cookies for user authentication
    const token = req.cookies.token;

    // check if token exists
    if (!token) {
      // console.log("Token not found");
      return res.json({ status: false });
    }

    // decode token
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

    // check if token in cookies is valid
    if (!decodedToken) {
      // console.log("Invalid token");
      return res.json({ status: false });
    }

    // console.log("Decoded token:", decodedToken);

    // find user in DB with same decodedToken ID
    const user = await getUserById(decodedToken.id);
    if (user) {
      // console.log("User found:", user);
      // if found, user exists thus successful authentication
      return res.json({ status: true, user: user.username });
    } else {
      // console.log("User not found");
      // console.log(decodedToken.id);
      // console.log(user);
      return res.json({ status: false });
    }
  } catch (error) {
    // console.error("Error in user verification:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
