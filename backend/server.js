require("dotenv").config({ path: "config.env" });

const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// disable 'X-Powered-By' header in response
app.disable("x-powered-by");
app.get('/api/welcome', function (req, res) {
    res.send("Welcome to the Server.");
})

// default case
app.use(function (req, res) {
  res.status(404);
});

// This is the correct placement for starting the server
app.listen(port, () => {
  // perform a database connection when the server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

// get driver connection
const dbo = require("./db/conn");
