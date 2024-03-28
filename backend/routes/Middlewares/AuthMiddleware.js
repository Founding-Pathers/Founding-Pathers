const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const dbo = require("../../db/conn");

require("dotenv").config();

// to check for user cookies, whether user authentication is valid using JWToken
router.post("/authenticate", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      let db_connect = dbo.getDbLogging();
      const user = await db_connect.collection("userAccount").find(data.email);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
});

module.exports = router;
