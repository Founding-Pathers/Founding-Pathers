// To connect with your mongoDB database
var mongoose = require("mongoose"),
  User = require("./UserSchema");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
console.log(uri);
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

mongoose.connect(
  uri,
  {
    dbName: "myDB",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("Connected to myDB database"))
);

// For backend and express
const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    resp.send("Something Went Wrong\n" + e);
  }
});
app.listen(5000);

app.post("/usercreatetest", async (req, resp) => {
  try {
    const user = new User({
      first_name: "John",
      last_name: "Doe",
      email: "test@hotmail.com",
      password: "123456",
    });
    // save user to database
    testUser.save(function (err) {
      if (err) throw err;
    });
    // fetch user and test password verification
    User.findOne({ username: "jmar777" }, function (err, user) {
      if (err) throw err;

      // test a matching password
      user.comparePassword("Password123", function (err, isMatch) {
        if (err) throw err;
        console.log("Password123:", isMatch); // -> Password123: true
      });

      // test a failing password
      user.comparePassword("123Password", function (err, isMatch) {
        if (err) throw err;
        console.log("123Password:", isMatch); // -> 123Password: false
      });
    });
  } catch (e) {
    resp.send("Something Went Wrong\n" + e);
  }
});
