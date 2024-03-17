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
