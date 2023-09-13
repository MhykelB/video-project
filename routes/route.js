const path = require("path");
const express = require("express");
const router = express.Router();
const {
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/mainControllers");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});
router.get("/:user_id", getPerson);
router.post("/", addPerson);
router.patch("/:user_id", updatePerson);
router.delete("/:user_id", deletePerson);
module.exports = router;
