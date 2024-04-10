const express = require("express");

const pastSearchesData = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// get all past searches for user email
pastSearchesData.route("/pastsearches").post(async function (req, res) {
  try {
    let logging_connect = dbo.getDbLogging();
    let email = req.body.email;
    const pastSearches = await logging_connect
      .collection("pastsearches")
      .find({ email: email })
      .toArray();
    res.json(pastSearches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// post a new past search for user email
pastSearchesData.route("/pastsearches/add").post(async function (req, res) {
  try {
    let logging_connect = dbo.getDbLogging();
    let email = req.body.email;
    let lat = req.body.lat;
    let lon = req.body.lon;
    let destination = req.body.destination;
    let created_at = new Date();
    const pastSearch = await logging_connect
      .collection("pastsearches")
      .insertOne({
        email: email,
        lat: lat,
        lon: lon,
        destination: destination,
        created_at: created_at,
      });
    res.json(pastSearch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = pastSearchesData;
