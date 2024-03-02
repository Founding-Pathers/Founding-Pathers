const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /userpref.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

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
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("userPreferences")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Create a new user preference
router.route("/userpref/add").post(function (req, response, next) {
  let db_connect = dbo.getDbLogging();
  let myobj = {
    id: req.body.id,
    wheelchair_friendly: req.body.wheelchair_friendly,
    f_and_b: req.body.f_and_b,
    is_sheltered: req.body.is_sheltered,
    tourist_attraction: req.body.tourist_attraction,
    bus_stop: req.body.bus_stop,
    mrt: req.body.mrt,
    pickup_dropoff: req.body.pickup_dropoff,
    nature: req.body.nature,
  };
  db_connect
    .collection("userPreferences")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// Update a user preference by id
router.route("/userpref/update/:id").post(function (req, response, next) {
  let db_connect = dbo.getDbLogging();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      wheelchair_friendly: req.body.wheelchair_friendly,
      f_and_b: req.body.f_and_b,
      is_sheltered: req.body.is_sheltered,
      tourist_attraction: req.body.tourist_attraction,
      bus_stop: req.body.bus_stop,
      mrt: req.body.mrt,
      pickup_dropoff: req.body.pickup_dropoff,
      nature: req.body.nature,
    },
  };
  db_connect
    .collection("userPreferences")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 user preference updated");
      response.json(res);
    });
});

module.exports = router;
