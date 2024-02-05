// express server and initialize port
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// for environment variables
require("dotenv").config({ path: "./config.env" });

// get driver connection
const dbo = require("./db/conn");

// enables CORS
const cors = require("cors");
app.use(cors());

//parsing JSON
app.use(express.json());
app.use(require("./routes/record"));

// starting of Server
app.listen(port, async () => {
  // perform a database connection when the server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

// disable 'X-Powered-By' header in response
app.disable("x-powered-by");
app.get('/api/welcome', function (req, res) {
    res.send("Welcome to the Server.");
})