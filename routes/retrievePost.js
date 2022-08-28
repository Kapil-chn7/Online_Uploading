const router = require("express").Router();
const client = require("../dataBase/dbConnection");
const dotenv = require("dotenv").config();
//route to upload data to the database

router.get("/", async (req, res) => {
  await client.connect(async (err) => {
    const collection = client
      .db(dotenv.parsed.DB_NAME)
      .collection(dotenv.parsed.DB_COLLECTION);
    // perform actions on the collection object
    await collection
      .find({})
      .toArray()
      .then((data) => {
        // console.log("this si", data);
        res.json(data).status(200);
      })
      .catch((err) => {
        res.send(500);
      });
  });
  client.close();
});

module.exports = router;
