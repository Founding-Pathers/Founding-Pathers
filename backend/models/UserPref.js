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
    wheelchair_friendly: {
      type: Boolean,
      required: true,
    },
    // insert more user preferences here
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
      is_elderly: false,
      // insert more user preferences here
    };

    await usersCollection.insertOne(newUserPref);
    console.log(id + " user preference successfully created");
  } catch (error) {
    console.log("Error creating user preference", error.message);
    return error.message;
  }
}

module.exports = { createUserPref, UserPref };
