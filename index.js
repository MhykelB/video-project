const express = require("express");
const app = require("express")();
require("express-async-errors");
const route = require("./routes/route");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
//middlewares

app.use(express.static("/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/vids", route);
app.get("/", (req, res) => {
  res.send("good");
});

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL).then(() => {
    //   console.log("connected to database");
    // });

    app.listen(PORT, () => {
      console.log(`app is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
