var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for user preferences
const UserPrefSchema = new Schema(
  {
    id: {
      type: String,
      ref: "User",
      required: true,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    f_and_b: {
      type: Boolean,
      required: true,
    },
    is_sheltered: {
      type: Boolean,
      required: true,
    },
    tourist_attraction: {
      type: Boolean,
      required: true,
    },
    bus_stop: {
      type: Boolean,
      required: true,
    },
    mrt: {
      type: Boolean,
      required: true,
    },
    pickup_dropoff: {
      type: Boolean,
      required: true,
    },
    nature: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "userPreferences",
  }
);

const UserPref = mongoose.model("userPreferences", UserPrefSchema);

module.exports = UserPref;
