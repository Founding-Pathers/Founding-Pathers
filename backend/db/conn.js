const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client1 = new MongoClient(uri);
const client2 = new MongoClient(uri);

let _db1;
let _db2;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client1.connect();
      await client2.connect();
    } catch (e) {
      console.error(e);
    }

    _db1 = client1.db("logging");
    _db2 = client2.db("routes");

    return _db1 === undefined
      ? false
      : true && _db2 === undefined
      ? false
      : true;
  },

  getDbLogging: function () {
    return _db1;
  },
  getDbRoutes: function () {
    return _db2;
  },
};

// ServerApiVersion code if required
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
