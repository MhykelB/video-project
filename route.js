const express = require("express");
const router = express.Router();

const endPoint = (req, res) => {
  const { slack_name, track } = req.query;
  if (!slack_name || !track) {
    return res.status(400).json("include required query parameters");
  }
  const weekDay = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  const day = new Date().getDay();
  const currentDay = weekDay[day];
  console.log(currentDay);
  return res.status(200).json(currentDay);
};

router.get("/", endPoint);
module.exports = router;
