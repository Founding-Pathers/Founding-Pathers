var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Define a schema for the tuple
const tupleSchema = new mongoose.Schema({
  validation: {
    type: Boolean,
    required: true,
  },
  issue_desc: {
    type: String,
    required: true,
  },
});

// Schema for user preferences
const RoutesTakenSchema = new Schema(
  {
    account_id: {
      type: String,
      ref: "User",
      required: true,
    },
    route_index: {
      type: Number,
      ref: "ComputedRoutes",
      required: true,
    },
    user_validated: {
      type: Boolean,
      required: true,
    },
    edges_validation: {
      type: Map,
      of: tupleSchema,
      required: true,
    },
    deleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "routestaken",
  }
);

const RoutesTaken = mongoose.model("routestaken", RoutesTakenSchema);

module.exports = RoutesTaken;
