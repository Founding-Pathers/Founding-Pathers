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
      console.log(data);
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
  let edges_validation = req.body.edges_validation;

  // edges_validation is a dictionary of dictionaries
  for (let key in edges_validation) {
    let edge = edges_validation[key];
    let pictures = edge.pictures;
    let validated = edge.validation;
    let base64Images = [];
    if (validated === false) {
      continue;
    }
    for (let i = 0; i < pictures.length; i++) {
      await imageToBase64(pictures[i])
        .then((response) => {
          base64Images.push(response);
        })
        .catch((error) => {
          console.log(error); // Expection error....
        });
    }
    edge.pictures = base64Images;
  }

  let myobj = {
    email: req.body.email, // email
    route_id: req.body.route_id,
    travel_mode: req.body.travel_mode,
    user_validated: req.body.user_validated,
    edges_validation: edges_validation,
    deleted: false,
  };
  db_connect.collection("routesTaken").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = routesTaken;
