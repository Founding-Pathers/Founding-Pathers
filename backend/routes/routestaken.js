const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /routehistory.
const routesTaken = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve list of all routes taken
routesTaken.route("/routehistory").get(async function (req, res) {
  let db_connect = dbo.getDbLogging();
  db_connect
    .collection("routesTaken")
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

// Retrieve list of all routes taken that were not deleted
routesTaken.route("/routehistory").get(async function (req, res) {
  let db_connect = dbo.getDbLogging();
  db_connect
    .collection("routesTaken")
    .find({ deleted: false })
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

// Retrieve specific route by routestaken id
routesTaken.route("/routehistory/:id").get(function (req, res) {
  let db_connect = dbo.getDbLogging();
  let myquery = { _id: ObjectId(req.body.id) };
  db_connect
    .collection("routesTaken")
    .findOne(myquery, { deleted: false }, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Retrieve all routes taken by current user id
routesTaken.route("/routehistory/user").get(function (req, res) {
  try {
    let db_connect = dbo.getDbLogging();
    let myquery = { account_id: ObjectId(req.params.id) };
    const records = db_connect
      .collection("routesTaken")
      .find(myquery, { deleted: false })
      .toArray();
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new record
routesTaken.route("/routehistory/add").post(function (req, response) {
  let db_connect = dbo.getDbLogging();
  let myobj = {
    id: req.body.id, // account_id
    route_index: req.body.route_index,
    user_validated: req.body.user_validated,
    edges_validation: req.body.edges_validation,
  };
  db_connect.collection("routesTaken").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = routesTaken;
