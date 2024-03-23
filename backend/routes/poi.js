import * as turf from "@turf/turf";
const express = require("express");

// router will be added as a middleware
// and will take control of requests starting with path /computedroutes.
const router = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Function to calculate the destination point given distance and bearing from start point
function calculateDestinationPoint(lat, lon, distance, bearing) {
  const earthRadius = 6371e3; // Earth radius in meters

  const φ1 = (lat * Math.PI) / 180; // Latitude in radians
  const λ1 = (lon * Math.PI) / 180;
  const θ = (bearing * Math.PI) / 180;

  const angularDistance = distance / earthRadius; // Angular distance in radians

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(angularDistance) +
      Math.cos(φ1) * Math.sin(angularDistance) * Math.cos(θ)
  );

  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(θ) * Math.sin(angularDistance) * Math.cos(φ1),
      Math.cos(angularDistance) - Math.sin(φ1) * Math.sin(φ2)
    );

  const newLat = (φ2 * 180) / Math.PI;
  const newLon = (λ2 * 180) / Math.PI;

  return { lat: newLat, lon: newLon };
}

// Function to calculate the bearing between two points A and B
function calculateBearing(lat1, lon1, lat2, lon2) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  let θ = Math.atan2(y, x);
  θ = ((θ * 180) / Math.PI + 360) % 360; // Convert radians to degrees and normalize to [0, 360) range

  return θ;
}

// Find nearby POIs along the route
router.route("/poi").post(async (req, res) => {
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

  // append route_coords[0: route_coords.length-1] reversed to route_coords
  let last_point = route_coords[route_coords.length - 1];
  route_coords = route_coords.concat(
    route_coords.slice(0, route_coords.length - 1).reverse()
  );

  let linear_ring = [];

  for (let i = 1; i < route_coords.length; i++) {
    // calculate the bearing between two points
    // if first and latest point, calculate the third point in the opposite bearing direction
    let bearing = calculateBearing(
      route_coords[i - 1][1],
      route_coords[i - 1][0],
      route_coords[i][1],
      route_coords[i][0]
    );
    // if first point, halfway point or last point, calculate the third point in the opposite bearing direction
    if (
      i == 1 ||
      i == Math.floor(route_coords.length / 2) ||
      i == route_coords.length - 1
    ) {
      let new_point = calculateDestinationPoint(
        route_coords[i - 1][1],
        route_coords[i - 1][0],
        poi_dist,
        bearing - 180
      );
      console.log(new_point);
      linear_ring.push([new_point.lon, new_point.lat]);
    }
    let new_point = calculateDestinationPoint(
      route_coords[i - 1][1],
      route_coords[i - 1][0],
      poi_dist,
      bearing - 90
    );
    console.log(new_point);
    linear_ring.push([new_point.lon, new_point.lat]);
  }

  // let unique_poi_ids = [...new Set(poi.map((item) => item.properties.fid))];

  // // Get unique POIs
  // let unique_pois = [];
  // for (let i = 0; i < unique_poi_ids.length; i++) {
  //   let unique_poi = poi.find(
  //     (element) => element.properties.fid === unique_poi_ids[i]
  //   );
  //   unique_pois.push(unique_poi);
  // }

  // res.json(unique_pois);
  res.json("done");
});

module.exports = router;
