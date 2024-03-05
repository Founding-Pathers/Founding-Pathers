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

// Retrieve specific route by computedroutes id (admin)
router.route("/shortestroute").get(function (req, res) {
  let db_connect = dbo.getDbRoutes();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("shortest_route")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Retrieve first route in computedroutes (dev)
router.route("/firstshortestroute").get(function (req, res) {
  let db_connect = dbo.getDbRoutes();
  const firstDoc = db_connect
    .collection("shortest_route")
    .find()
    .limit(5)
    .toArray();
  res.json(firstDoc);
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
          Math.abs(req.body.origin_lat - data[i].properties.ORIGIN_X) <
            Math.abs(req.body.origin_lat - best_origin_lat) &&
          Math.abs(req.body.origin_long - data[i].properties.ORIGIN_Y) <
            Math.abs(req.body.origin_long - best_origin_long)
        ) {
          best_origin_lat = data[i].properties.ORIGIN_X;
          best_origin_long = data[i].properties.ORIGIN_Y;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (
          Math.abs(req.body.dest_lat - data[i].properties.DEST_X) <
            Math.abs(req.body.dest_lat - best_dest_lat) &&
          Math.abs(req.body.dest_long - data[i].properties.DEST_Y) <
            Math.abs(req.body.dest_long - best_dest_long)
        ) {
          best_dest_lat = data[i].properties.DEST_X;
          best_dest_long = data[i].properties.DEST_Y;
        }
      }
      data = data.filter(
        (data) =>
          data.properties.ORIGIN_X === best_origin_lat &&
          data.properties.ORIGIN_Y === best_origin_long &&
          data.properties.DEST_X === best_dest_lat &&
          data.properties.DEST_Y === best_dest_long
      );
      console.log(data);
      res.json(data);
    });
});

module.exports = router;
