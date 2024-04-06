const express = require("express");
const fs = require("fs");
const path = require("path");
const Json2csvParser = require("json2csv").Parser;
const archiver = require("archiver");

const exportData = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// Export all collections in the database
exportData.route("/export").get(async function (req, res) {
  try {
    let logging_connect = dbo.getDbLogging();
    let routes_connect = dbo.getDbRoutes();
    const log_collections = await logging_connect.listCollections().toArray();
    const routes_collections = await routes_connect.listCollections().toArray();

    // Create a directory to store CSV files
    const directory = path.join(__dirname, "csv_exports");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    // Process each collection
    for (const collection of log_collections) {
      const collectionName = collection.name;

      // Create a writable stream for the CSV file
      const filePath = path.join(directory, `${collectionName}.csv`);

      // Query the collection and write rows to CSV file
      const collectionData = await logging_connect
        .collection(collectionName)
        .find()
        .toArray((err, data) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
          const json2csvParser = new Json2csvParser({ header: true });
          const csvData = json2csvParser.parse(data);
          fs.writeFile(filePath, csvData, function (error) {
            if (error) throw error;
          });
        });
    }

    possible_route_ops = [
      "shortest_path",
      "sheltered_path",
      "nature_path",
      "cycling_shortest_path",
      "cycling_nature_path",
      "bfa_shortest_path",
      "bfa_sheltered_path",
      "bfa_nature_path",
    ];

    // Process each collection
    for (const collection of routes_collections) {
      const collectionName = collection.name;
      if (possible_route_ops.indexOf(collectionName) != -1) {
        continue;
      }

      // Create a writable stream for the CSV file
      const filePath = path.join(directory, `${collectionName}.csv`);

      // Query the collection and write rows to CSV file
      const collectionData = await routes_connect
        .collection(collectionName)
        .find()
        .toArray((err, data) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
          const json2csvParser = new Json2csvParser({ header: true });
          const csvData = json2csvParser.parse(data);
          fs.writeFile(filePath, csvData, function (error) {
            if (error) throw error;
          });
        });
    }

    // Set response headers for CSV file attachment
    const zipPath = path.join(directory, "collections.zip");

    // Create a writable stream for the ZIP file
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // compression level
    });

    // Add files from the directory to the ZIP stream
    archive.directory(directory, false);

    // Pipe the ZIP stream to the response object
    output.on("close", () => {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
      res.download(zipPath, "collections.zip"); // Send the ZIP file as a download attachment
    });

    // Catch any errors during ZIP creation
    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = exportData;
