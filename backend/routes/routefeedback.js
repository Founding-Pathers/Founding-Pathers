const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /userpref.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Retrieve list of all user preferences (admin)
router.route("/routefeedback").get(async function (req, res) {
  let db_connect = dbo.getDbLogging();
  db_connect
    .collection("routeFeedback")
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

// Retrieve route feedback by user email
router.route("/routefeedback/user").get(function (req, res, next) {
  let db_connect = dbo.getDbLogging();
  let myquery = { email: req.body.email };
  db_connect
    .collection("routeFeedback")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Create a new route feedback using routestaken_id
router.route("/routefeedback/add").post(async function (req, resp, next) {
  let db_connect = dbo.getDbLogging();

  const {
    email,
    overall_exp,
    general_comments,
    previous_use,
    faster_path,
    more_suited,
    reasons,
  } = req.body;

  let myobj = {
    email: email,
    overall_exp: overall_exp,
    general_comments: general_comments,
    previous_use: previous_use === "true" ? true : false,
    faster_path: faster_path === "true" ? true : false,
    more_suited: more_suited === "true" ? true : false,
    reasons: reasons,
    created_at: new Date(),
  };
  try {
    db_connect.collection("routeFeedback").insertOne(myobj);
    console.log("route feedback added successfully");
    resp.status(200).json({ message: "route feedback added successfully" });
  } catch (error) {
    console.error("Error adding route feedback:", error.message);
    resp.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
