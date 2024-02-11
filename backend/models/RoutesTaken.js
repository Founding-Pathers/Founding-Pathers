const dbo = require("../db/conn");

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
      type: Number,
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
    feedback_q1: {
      type: String,
      required: true,
    },
    feedback_q2: {
      type: String,
      required: true,
    },
    feedback_q3: {
      type: String,
      required: true,
    },
    feedback_q4: {
      type: Boolean,
      required: true,
    },
    feedback_q5: {
      type: Boolean,
      required: true,
    },
    feedback_q6: {
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

module.exports = { createUserPref, RoutesTaken };
