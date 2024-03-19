var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for user preferences
const DatabaseLoggingSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    file_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "loaded_at",
    },
    collection: "databaselogging",
  }
);

const DatabaseLogging = mongoose.model(
  "databaselogging",
  DatabaseLoggingSchema
);

module.exports = DatabaseLogging;
