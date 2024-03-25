const turf = require("@turf/turf");
const express = require("express");
const simplepolygon = require("simplepolygon");

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

// Retrieve variable routes according to where the user is at through lat and long
router.route("/route").post(async function (req, res) {
  try {
    let db_connect = dbo.getDbRoutes();
    let route_op = req.body.route_op;
    let poi_type = req.body.type;

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

    possible_route_ops = [
      "shortest",
      "sheltered",
      "nature",
      "cycling_shortest",
      "cycling_nature",
      "bfa_shortest",
      "bfa_sheltered",
      "bfa_nature",
    ];

    possible_poi_types = ["BUSSTOP", "FNB", "MRT", "PICKUP", "TOURISM"];

    if (!possible_route_ops.includes(route_op)) {
      res.status(400).json({ error: "Invalid route option" });
    }

    const route = await db_connect
      .collection(route_op + "_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    if (!(poi_type == null)) {
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

      res.json({ route, poi });
    } else {
      res.json({ route });
    }
  } catch (error) {
    console.error("Error in route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve routes according to where the walking user is at through lat and long
router.route("/shortest").post(async function (req, res) {
  try {
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
  } catch (error) {
    console.error("Error in shortest route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve sheltered routes according to where the user is at through lat and long
router.route("/sheltered").post(async function (req, res) {
  try {
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
      .collection("sheltered_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    res.json({ route });
  } catch (error) {
    console.error("Error in sheltered route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve nature routes according to where the user is at through lat and long
router.route("/nature").post(async function (req, res) {
  try {
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
      .collection("nature_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    res.json({ route });
  } catch (error) {
    console.error("Error in nature route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve cycling routes according to where the user is at through lat and long
router.route("/cycling").post(async function (req, res) {
  try {
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
      .collection("cycling_shortest_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    res.json({ route });
  } catch (error) {
    console.error("Error in cycling route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve cycling nature routes according to where the user is at through lat and long
router.route("/cyclingnature").post(async function (req, res) {
  try {
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
      .collection("cycling_nature_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    res.json({ route });
  } catch (error) {
    console.error("Error in cycling nature route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve bfa shortest routes according to where the user is at through lat and long
router.route("/bfashortest").post(async function (req, res) {
  try {
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
      .collection("bfa_shortest_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    res.json({ route });
  } catch (error) {
    console.error("Error in bfa shortest route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve bfa sheltered routes according to where the user is at through lat and long
router.route("/bfasheltered").post(async function (req, res) {
  try {
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
      .collection("bfa_sheltered_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    res.json({ route });
  } catch (error) {
    console.error("Error in bfa sheltered route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve wheelchair nature routes according to where the user is at through lat and long
router.route("/bfanature").post(async function (req, res) {
  try {
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
      .collection("bfa_sheltered_path")
      .find({ "properties.ROUTE_ID": route_id })
      .toArray();

    res.json({ route });
  } catch (error) {
    console.error("Error in bfa nature route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
