const express = require("express");
const app = require("express")();
require("express-async-errors");
const route = require("./routes/route");
const cors = require("cors");
const connectDB = require("./DB/connectDB");
const errorHandler = require("./errors/errorHandler");
const PORT = 5000;
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api", route);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL).then(() => {
      console.log("connected to database");
    });
    app.listen(PORT, () => {
      console.log(`app is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
