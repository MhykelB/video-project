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
  const data = {
    slack_name: "Mhyke",
    current_day: currentDay,
    utc_time: new Date().toISOString().split(".")[0] + "Z",
    track: "backend",
    github_file_url:
      "https://github.com/MhykelB/zuri_stage_one_backend/blob/main/index.js",
    github_repo_url: "https://github.com/MhykelB/zuri_stage_one_backend.git",
    status_code: 200,
  };
  return res.status(200).json(data);
};

router.get("/", endPoint);
module.exports = router;
