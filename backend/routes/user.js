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

// Retrieve user by email (Admin)
router.route("/user").get(async function (req, res) {
  let db_connect = dbo.getDbLogging();
  let myquery = { email: req.body.email };
  try {
    const result = await db_connect.collection("userAccount").findOne(myquery);
    // if there is no user with the email
    if (result === {}) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Update a user account details by email
router.route("/user/update").put(function (req, response) {
  let db_connect = dbo.getDbLogging();
  let myquery = { email: req.body.email };
  let newvalues = {
    $set: {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      updatedAt: new Date(),
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

// Delete a user account details by email
router.route("/user/delete").delete(function (req, response) {
  let db_connect = dbo.getDbLogging();
  let myquery = { email: req.body.email };
  db_connect.collection("userAccount").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 user deleted");
    response.json(obj);
  });
});

module.exports = router;
