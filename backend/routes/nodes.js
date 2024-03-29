const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /nodes.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve list of all routes taken (admin)
router.route("/nodes").get(async function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect
    .collection("nodes")
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Retrieve specific route by nodes id (admin)
router.route("/nodes/:id").get(function (req, res) {
  let db_connect = dbo.getDbRoutes();
  let myquery = { _id: ObjectId(req.body.id) };
  db_connect
    .collection("nodes")
    .findOne(myquery, { deleted: false }, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Output to excel file
router.route("/nodes/export").get(function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect
    .collection("nodes")
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

module.exports = router;
