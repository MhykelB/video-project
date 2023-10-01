const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../libs/multer");
const {
  createVideo,
  uploadVideoBytes,
  streamVideo,
  autoStream,
} = require("../controllers/mainControllers");

console.log(__dirname);

router.get("/create", createVideo);
router.post("/upload/:id", uploadMiddleware.single("file"), uploadVideoBytes);
router.get("/stream/:id", streamVideo);
router.get("/autostream/:id", autoStream);

module.exports = router;
