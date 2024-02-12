const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let _db;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }

    _db = client.db("myDB");

    return _db === undefined ? false : true;
  },

  getDb: function () {
    return _db;
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
