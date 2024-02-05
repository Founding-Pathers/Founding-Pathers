const express = require("express");

// recordRoutes instance of express router, router will be added as a middleware 
// and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve list of all records
recordRoutes.route("/record").get(async function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("records")
    .find({})
    .toArray() 
    .then (data => {
      console.log(data);
      res.json(data);
    });
  });

// Retrieve record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Create a new record
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.type,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Update a record by id
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.type,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Delete a record
recordRoutes.route("/:id").delete((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .deleteOne(myquery)
  });

module.exports = recordRoutes;