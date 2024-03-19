const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /computedroutes.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Find nearby POIs along the route
router.route("/poi").get(async (req, res) => {
  let db_connect = dbo.getDbRoutes();
  db_connect.collection("nodes").createIndex({ geometry: "2dsphere" });
  db_connect.collection("poi_info").createIndex({ geometry: "2dsphere" });
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

  let poi = [];
  let poi_dist = req.body.distance;
  let route_coords = route[0].geometry.coordinates;

  for (let i = 0; i < route_coords.length; i++) {
    let poi_near = await db_connect
      .collection("poi_info")
      .find({
        geometry: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [route_coords[i][0][0], route_coords[i][1][1]],
            },
            $maxDistance: poi_dist,
          },
        },
        "properties.type": req.body.type,
      })
      .toArray();
    poi.push(poi_near);
  }
  console.log(poi);

  let unique_pois = [...new Set(poi)];
  res.json(unique_pois[0]);
});

module.exports = router;
