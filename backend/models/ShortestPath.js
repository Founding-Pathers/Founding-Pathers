const dbo = require("../db/conn");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for user preferences
const ShortestPathSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    // Properties as an object
    properties: {
      type: {
        ROUTE_ID: String,
        ORIGIN_ID: String,
        DEST_ID: String,
        ORIGIN_X: Number,
        ORIGIN_Y: Number,
        DEST_X: Number,
        DEST_Y: Number,
        TimeTaken: Number,
        BEST_PATH_: Number,
      },
    },
    // Geometry as an object
    geometry: {
      type: {
        type: String,
        enum: ["Point"], // Assuming the geometry type is always 'Point'
        required: true,
      },
      coordinates: {
        type: [Number], // Array of numbers for coordinates
        required: true,
      },
    },
  },
  {
    timestamps: true,
    collection: "shortest_path",
  }
);

const ShortestPath = mongoose.model("shortestpath", ShortestPathSchema);

module.exports = ShortestPath;
