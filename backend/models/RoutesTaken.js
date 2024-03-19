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
    required: false,
  },
});

// Schema for user preferences
const RoutesTakenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    route_index: {
      type: String,
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
