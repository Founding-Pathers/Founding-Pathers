const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /user.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve list of all users
router.route("/users").get(async function (req, res) {
  try {
    let db_connect = dbo.getDbLogging();
    const users = await db_connect.collection("userAccount").find().toArray();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve user by id (Admin)
router.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDbLogging();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("userAccount").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Update a user account details by email
router.route("/user/update").put(function (req, response) {
  let db_connect = dbo.getDbLogging();
  let myquery = { email: req.body.email };
  let newvalues = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      updated_at: new Date(),
    },
  };
  db_connect
    .collection("userAccount")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 user updated");
      response.json(res);
    });
});

module.exports = router;
