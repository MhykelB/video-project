const express = require("express");
const router = express.Router();
const {
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/mainControllers");

router.get("/", (req, res) => {
  res.send("Ready to receive requests");
});
router.get("/:user_id", getPerson);
router.post("/", addPerson);
router.patch("/:user_id", updatePerson);
router.delete("/:user_id", deletePerson);
module.exports = router;
