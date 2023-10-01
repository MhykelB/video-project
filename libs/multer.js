const multer = require("multer");
require("dotenv").config();
const path = require("path");

// const storage = new GridFsStorage({
//   url: process.env.MONGO_URL,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return {
//       bucketName: "videos",
//       filename: `${Date.now()}-${file.originalname}`,
//     };
//   },
// });

const store = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (
      ext !== ".mp4" &&
      ext !== ".mkv" &&
      ext !== ".jpeg" &&
      ext !== ".jpg" &&
      ext !== ".png"
    ) {
      cb(new Error("File format is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
module.exports = store;
