var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for user preferences
const RouteFBSchema = new Schema(
  {
    _id: {
      type: String,
      ref: "RoutesTaken",
      required: true,
    },
    routestaken_id: {
      type: String,
      required: true,
    },
    overall_exp: {
      type: Number,
      required: true,
    },
    general_comments: {
      type: String,
      required: true,
    },
    previous_use: {
      type: Boolean,
      required: true,
    },
    faster_path: {
      type: Boolean,
      required: false,
    },
    more_suited: {
      type: Boolean,
      required: false,
    },
    reasons: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "routeFeedback",
  }
);

const RouteFB = mongoose.model("routeFeedback", RouteFBSchema);

module.exports = RouteFB;
