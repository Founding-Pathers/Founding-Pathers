const express = require("express");
const imageToBase64 = require("image-to-base64");

// router will be added as a middleware
// and will take control of requests starting with path /routehistory.
const routesTaken = express.Router();

// Connect to the database
const dbo = require("../db/conn");
const { base } = require("../models/RoutesTaken");

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

// Retrieve all routes taken by current user email
routesTaken.route("/routehistory/user").post(async function (req, res) {
  try {
    let db_connect = dbo.getDbLogging();
    let myquery = { email: req.body.email };
    const records = await db_connect
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
routesTaken.route("/routehistory/add").post(async function (req, response) {
  let db_connect = dbo.getDbLogging();
  let point_validation = req.body.point_validation;

  if (req.body.user_validated == true) {
    // point_validation is an dictionary of dictionaries
    for (let edge in point_validation) {
      let point = point_validation[edge];
      let pictures = point.pictures;
      let base64Images = [];
      for (let i = 0; i < pictures.length; i++) {
        await imageToBase64(pictures[i])
          .then((response) => {
            base64Images.push(response);
          })
          .catch((error) => {
            console.log(error); // Expection error....
          });
      }
      point.pictures = base64Images;
    }
  }

  let myobj = {
    email: req.body.email, // email
    route_id: req.body.route_id,
    travel_mode: req.body.travel_mode,
    user_validated: req.body.user_validated,
    comments: req.body.comments,
    point_validation: point_validation,
    deleted: false,
    created_at: new Date(),
  };
  db_connect.collection("routesTaken").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = routesTaken;
