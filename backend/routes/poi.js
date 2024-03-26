const turf = require("@turf/turf");
const express = require("express");
const simplepolygon = require("simplepolygon");

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

  // append route_coords[0: route_coords.length-1] reversed to route_coords
  route_coords = route_coords.concat(
    route_coords.slice(0, route_coords.length - 1).reverse()
  );

  let linear_ring = [];
  let first_point = [];

  for (let i = 1; i < route_coords.length; i++) {
    // calculate the bearing between two points
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
      linear_ring.push([new_point.lon, new_point.lat]);
      if (i == 1) {
        first_point = [new_point.lon, new_point.lat];
      }
    }

    let new_point = calculateDestinationPoint(
      route_coords[i - 1][1],
      route_coords[i - 1][0],
      poi_dist,
      bearing - 90
    );
    linear_ring.push([new_point.lon, new_point.lat]);
  }
  linear_ring.push(first_point);

  // Create a polygon from the linear ring
  let polygon = turf.polygon([linear_ring]);
  let simple_polygon = simplepolygon(polygon);
  let polygons = simple_polygon.features;

  let poi_query = [];

  // create or operator for each poi type
  for (let i = 0; i < poi_type.length; i++) {
    poi_query.push({ "properties.type": poi_type[i] });
  }

  // throw error if no poi type is selected
  if (poi_query == "") {
    res.json({ error: "No POI type selected" });
    return;
  }

  // Find POIs within the polygon for each poi type
  for (let j = 0; j < polygons.length; j++) {
    let pois = await db_connect
      .collection("poi_info")
      .find({
        geometry: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates: polygons[j].geometry.coordinates,
            },
          },
        },
        $or: poi_query,
      })
      .toArray();
    poi = poi.concat(pois);
  }

  res.json(poi);
  return;
});

module.exports = router;
