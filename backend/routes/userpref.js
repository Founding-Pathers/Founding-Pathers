const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /userpref.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");
const e = require("express");

// Retrieve list of all user preferences (admin)
router.route("/userpref").get(async function (req, res) {
  let db_connect = dbo.getDbLogging();
  db_connect
    .collection("userPreferences")
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Retrieve user preference by useraccount id
router.route("/userpref/").get(function (req, res, next) {
  let db_connect = dbo.getDbLogging();
  let myquery = { email: req.body.email };
  db_connect
    .collection("userPreferences")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

router.route("/userpref/test").get(function (req, res, next) {
  console.log("body: ", req.body.email);
  res.json(req.body.email);
});

// Create a new user preference
router.route("/userpref/add").post(async function (req, resp, next) {
  let db_connect = dbo.getDbLogging();

  const {
    email,
    wheelchair_friendly,
    f_and_b,
    is_sheltered,
    tourist_attraction,
    bus_stop,
    mrt,
    pickup_dropoff,
    nature,
  } = req.body;

  const userPreference = await db_connect
    .collection("userPreferences")
    .findOne({ email: email });

  if (userPreference) {
    return resp.status(409).json({ error: "User preference already exists" });
  } else {
    let myobj = {
      email: email,
      wheelchair_friendly: wheelchair_friendly === "true" ? true : false,
      f_and_b: f_and_b === "true" ? true : false,
      is_sheltered: is_sheltered === "true" ? true : false,
      tourist_attraction: tourist_attraction === "true" ? true : false,
      bus_stop: bus_stop === "true" ? true : false,
      mrt: mrt === "true" ? true : false,
      pickup_dropoff: pickup_dropoff === "true" ? true : false,
      nature: nature === "true" ? true : false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    db_connect
      .collection("userPreferences")
      .insertOne(myobj, function (err, res) {
        if (err) {
          console.error("Error adding user preference:", err);
          return resp.status(500).json({ error: "Internal Server Error" });
        }
        console.log("User preference added successfully");
        resp
          .status(200)
          .json({ message: "User preference added successfully" });
      });
  }
});

// Update a user preference by id
router.route("/userpref/update").post(function (req, resp, next) {
  let db_connect = dbo.getDbLogging();
  let myquery = { email: req.body.email };
  let newvalues = {
    $set: {
      wheelchair_friendly:
        req.body.wheelchair_friendly === "true" ? true : false,
      f_and_b: req.body.f_and_b === "true" ? true : false,
      is_sheltered: req.body.is_sheltered === "true" ? true : false,
      tourist_attraction: req.body.tourist_attraction === "true" ? true : false,
      bus_stop: req.body.bus_stop === "true" ? true : false,
      mrt: req.body.mrt === "true" ? true : false,
      pickup_dropoff: req.body.pickup_dropoff === "true" ? true : false,
      nature: req.body.nature === "true" ? true : false,
      updated_at: new Date(),
    },
  };
  db_connect
    .collection("userPreferences")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) {
        console.error("Error updating user preference:", err);
        return resp.status(500).json({ error: "Internal Server Error" });
      }
      console.log("1 user preference updated");
      resp
        .status(200)
        .json({ message: "User preference updated successfully" });
    });
});

module.exports = router;
