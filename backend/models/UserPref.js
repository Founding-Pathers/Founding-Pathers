const dbo = require("../db/conn");

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
      required: true,
    },
    wheelchair_friendly: {
      type: Boolean,
      required: true,
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
    collection: "userprefs",
  }
);

const UserPref = mongoose.model("userprefs", UserPrefSchema);

// create default user preferences for new user
async function createUserPref(id) {
  try {
    const db = await dbo.getDb();
    const userprefCollection = db.collection("userprefs");
    const existingUserPref = await userprefCollection.findOne({
      $or: [{ id: id }],
    });

    if (existingUserPref) {
      console.log("User Preference with id " + id + " already exists.");
      return;
    }

    // Create a new basic user preference
    const newUserPref = {
      id: id,
      wheelchair_friendly: false,
      f_and_b: false,
      is_sheltered: false,
      tourist_attraction: false,
      bus_stop: false,
      mrt: false,
      pickup_dropoff: false,
      nature: false,
    };

    await usersCollection.insertOne(newUserPref);
    console.log(id + " user preference successfully created");
  } catch (error) {
    console.log("Error creating user preference", error.message);
    return error.message;
  }
}

module.exports = { createUserPref, UserPref };
