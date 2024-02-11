const express = require("express");

// recordRoutes instance of express router, router will be added as a middleware
// and will take control of requests starting with path /record.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve user preference by id
router.route("/userpref/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("userpref").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Create a new user preference
router.route("/userpref/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.body.id,
    wheelchair_friendly: req.body.wheelchair_friendly,
    is_elderly: req.body.is_elderly,
  };
  db_connect.collection("userpref").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Update a user preference by id
router.route("/userpref/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      wheelchair_friendly: req.body.wheelchair_friendly,
      is_elderly: req.body.is_elderly,
    },
  };
  db_connect
    .collection("userpref")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 user preference updated");
      response.json(res);
    });
});

module.exports = userPreferences;
