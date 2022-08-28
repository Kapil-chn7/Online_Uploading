const router = require("express").Router();
const multer = require("multer");
const dotenv = require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
//import database connection file
const client = require("../dataBase/dbConnection");
const storage = multer.memoryStorage();
const uploadval = multer();

//route to upload data to the database

let streamUpload = async (req, i) => {
  const format = req.files[i].mimetype;

  const slug = format.split("/").pop();
  const resource_type = i == 0 ? "image" : "video";

  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { resource_type: resource_type, chunk_size: 6000000 },
      (error, result) => {
        //console.log("this is the files buffer", req.files[i].buffer);
        if (error) {
          reject(result);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(req.files[i].buffer).pipe(stream);
  });
};

async function upload(req) {
  const urls = { videoUrl: null, imageUrl: null };
  await streamUpload(req, 0)
    .then(async (resp) => {
      //uploading image
      urls.imageUrl = resp.url;
      await streamUpload(req, 1)
        .then(async (resp) => {
          urls.videoUrl = resp.url;

          const obj = {
            videoTitle: req.body.videoTitle,
            videoDescription: req.body.videoDescription,
            videoUrl: urls.videoUrl,
            imageUrl: urls.imageUrl,
          };

          client.connect(async (err) => {
            const collection = client
              .db(dotenv.parsed.DB_NAME)
              .collection(dotenv.parsed.DB_COLLECTION);
            // perform actions on the collection object
            if (err) {
              console.log("this is the err", err);
              return;
            } else {
              await collection.insertOne(obj, (err) => {
                if (err) {
                  return;
                } else {
                  client.close();
                }
              });
            }
          });
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}
router.post("/", uploadval.array("files"), async (req, res) => {
  cloudinary.config({
    cloud_name: dotenv.parsed.CLOUD_NAME,
    api_key: dotenv.parsed.API_KEY,
    api_secret: dotenv.parsed.API_SECRET,
  });

  try {
    await upload(req);
    res.send(200);
  } catch {
    res.send(500);
  }
});

module.exports = router;
