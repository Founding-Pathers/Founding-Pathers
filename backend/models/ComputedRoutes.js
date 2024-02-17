const dbo = require("../db/conn");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for user preferences
const ComputedRoutesSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    start_node_index: {
      type: Number,
      required: true,
    },
    end_node_index: {
      type: Number,
      required: true,
    },
    travel_mode: {
      type: Number,
      required: true,
    },
    // match boolean variables with user preferences here
    is_sheltered: {
      type: Boolean,
      required: true,
    },
    best_route: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "computedroutes",
  }
);

const ComputedRoutes = mongoose.model("computedroutes", ComputedRoutesSchema);

module.exports = ComputedRoutes;
