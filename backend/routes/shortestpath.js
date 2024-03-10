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
router.route("/shortestroute").post(function (req, res) {
  let db_connect = dbo.getDbRoutes();
  db_connect
    .collection("shortest_route")
    .find()
    .toArray()
    .then((data) => {
      let best_origin_lat = 0;
      let best_origin_long = 0;
      let best_dest_lat = 0;
      let best_dest_long = 0;
      // for each row, check if the lat and long is the closest to the user's lat and long
      // save the best lat and long
      // filter the data to only include routes with the best lat and long
      // return the data
      for (let i = 0; i < data.length; i++) {
        if (
          Math.abs(req.body.origin_lat - data[i].properties.Origin_LAT) <
            Math.abs(req.body.origin_lat - best_origin_lat) &&
          Math.abs(req.body.origin_long - data[i].properties.Origin_LONG) <
            Math.abs(req.body.origin_long - best_origin_long)
        ) {
          best_origin_lat = data[i].properties.Origin_LAT;
          best_origin_long = data[i].properties.Origin_LONG;
        }
        if (
          Math.abs(req.body.dest_lat - data[i].properties.Dest_LAT) <
            Math.abs(req.body.dest_lat - best_dest_lat) &&
          Math.abs(req.body.dest_long - data[i].properties.Dest_LONG) <
            Math.abs(req.body.dest_long - best_dest_long)
        ) {
          best_dest_lat = data[i].properties.Dest_LAT;
          best_dest_long = data[i].properties.Dest_LONG;
        }
      }
      data = data.filter(
        (data) =>
          data.properties.Origin_LAT === best_origin_lat &&
          data.properties.Origin_LONG === best_origin_long &&
          data.properties.Dest_LAT === best_dest_lat &&
          data.properties.Dest_LONG === best_dest_long
      );
      // console.log(data);
      res.json(data);
    });
});

module.exports = router;
