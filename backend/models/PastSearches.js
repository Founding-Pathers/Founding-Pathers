var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for user preferences
const PastSearchesSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "pastsearches",
  }
);

const PastSearches = mongoose.model("pastsearches", PastSearchesSchema);

module.exports = PastSearches;
