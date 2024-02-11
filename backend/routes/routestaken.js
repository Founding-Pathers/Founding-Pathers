const express = require("express");

// recordRoutes instance of express router, router will be added as a middleware
// and will take control of requests starting with path /record.
const routesTaken = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve list of all routes taken
routesTaken.route("/routes").get(async function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("routestaken")
    .find({})
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Retrieve specific route by routestaken id
routesTaken.route("/routes/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.body.id) };
  db_connect.collection("routestaken").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Retrieve all routes taken by current user id
routesTaken.route("/routes/user/").get(function (req, res) {
  try {
    let db_connect = dbo.getDb();
    let myquery = { account_id: ObjectId(req.params.id) };
    const records = db_connect
      .collection("routestaken")
      .find(myquery)
      .toArray();
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new record
routesTaken.route("/routes/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.body.id, // account_id
    route_index: req.body.route_index,
    user_validated: req.body.user_validated,
    edges_validation: req.body.edges_validation,
    feedback_q1: req.body.feedback_q1,
    feedback_q2: req.body.feedback_q2,
    feedback_q3: req.body.feedback_q3,
    feedback_q4: req.body.feedback_q4,
    feedback_q5: req.body.feedback_q5,
    feedback_q6: req.body.feedback_q6,
  };
  db_connect.collection("routestaken").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = routesTaken;
