const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /computedroutes.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve list of all computedroutes (admin)
router.route("/computedroutes").get(async function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect
    .collection("computedRoutes")
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Retrieve specific route by computedroutes id (admin)
router.route("/computedroutes/:id").get(function (req, res) {
  let db_connect = dbo.getDbRoutes();
  let myquery = { _id: ObjectId(req.body.id) };
  db_connect
    .collection("computedRoutes")
    .findOne(myquery, { deleted: false }, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Retrieve routes according to user preferences

module.exports = router;
