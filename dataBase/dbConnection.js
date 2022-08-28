const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv").config();
const uri = dotenv.URL;
const client = new MongoClient(dotenv.parsed.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
