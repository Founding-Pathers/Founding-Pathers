// express server and initialize port
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// for environment variables
require("dotenv").config({ path: "../.env" });

// get driver connection
const dbo = require("./db/conn");

// enables CORS
const cors = require("cors");
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//parsing JSON
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json(), urlencodedParser);
app.use(require("./routes/account"));
app.use(require("./routes/Middlewares/AuthMiddleware"));

// starting of Server
app.listen(port, async () => {
  // perform a database connection when the server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

app.disable("x-powered-by");
app.get("/api/welcome", function (req, res) {
  res.send("Welcome to the Server.");
});
