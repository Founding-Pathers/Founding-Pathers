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
  let poi_type = req.body.type;
  let route_coords = route[0].geometry.coordinates;
  route_coords = route_coords[0];

  for (let i = 0; i < route_coords.length; i++) {
    for (let j = 0; j < poi_type.length; j++) {
      let poi_near = await db_connect
        .collection("poi_info")
        .find({
          geometry: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [route_coords[i][0], route_coords[i][1]],
              },
              $maxDistance: poi_dist,
            },
          },
          "properties.type": poi_type[j],
        })
        .toArray();
      for (let j = 0; j < poi_near.length; j++) {
        poi.push(poi_near[j]);
      }
    }
  }

  let unique_poi_ids = [...new Set(poi.map((item) => item.properties.fid))];

  // Get unique POIs
  let unique_pois = [];
  for (let i = 0; i < unique_poi_ids.length; i++) {
    let unique_poi = poi.find(
      (element) => element.properties.fid === unique_poi_ids[i]
    );
    unique_pois.push(unique_poi);
  }

  res.json(unique_pois);
});

module.exports = router;
