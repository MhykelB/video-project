const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const options = {
  customCssUrl: "https://unpkg.com/swagger-ui-dist@3/swagger-ui.css",
};
const express = require("express");
const app = require("express")();
require("express-async-errors");
const route = require("./routes/route");
const cors = require("cors");
const connectDB = require("./DB/connectDB");
const errorHandler = require("./errors/errorHandler");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", route);
app.use(errorHandler);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc, options));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

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
