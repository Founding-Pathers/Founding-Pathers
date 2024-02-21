const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /databaselogging.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Retrieve list of all routes taken (admin)
router.route("/databaselogging").get(async function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect
    .collection("databaseLogging")
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Output to excel file
router.route("/databaselogging/export").get(function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect
    .collection("databaseLogging")
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

module.exports = router;
