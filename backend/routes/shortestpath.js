const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /computedroutes.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Converts the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Retrieve list of all computedroutes (admin)
router.route("/shortestroutes").get(async function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect
    .collection("shortest_route")
    .find()
    .limit(10)
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Retrieve routes according to where the user is at through lat and long
router.route("/shortestroute").post(async function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect.collection("nodes").createIndex({ geometry: "2dsphere" });
  const origin = await db_connect
    .collection("nodes")
    .find({
      geometry: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(req.body.origin_long),
              parseFloat(req.body.origin_lat),
            ],
          },
          $maxDistance: 1000,
        },
      },
    })
    .limit(1)
    .toArray();
  let origin_id = origin[0].properties.ORIGIN_ID;

  const dest = await db_connect
    .collection("nodes")
    .find({
      geometry: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(req.body.dest_long),
              parseFloat(req.body.dest_lat),
            ],
          },
          $maxDistance: 1000,
        },
      },
    })
    .limit(1)
    .toArray();
  let dest_id = dest[0].properties.ORIGIN_ID;

  let route_id = origin_id + ":" + dest_id;

  const route = await db_connect
    .collection("shortest_path")
    .find({ "properties.ROUTE_ID": route_id })
    .toArray();

  res.json({ route });
});

module.exports = router;
