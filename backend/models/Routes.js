const dbo = require("../db/conn");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for user preferences
const RoutesSchema = new Schema({
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
  distance: {
    type: Number,
    required: true,
  },
});

const Routes = mongoose.model("routes", RoutesSchema);

module.exports = Routes;
