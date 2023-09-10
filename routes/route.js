const express = require("express");
const router = express.Router();
const {
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/mainControllers");

router.get("/", getPerson);
router.post("/", addPerson);
router.patch("/", updatePerson);
router.delete("/", deletePerson);
module.exports = router;
