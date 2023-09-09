const app = require("express")();
const route = require("./route");
const cors = require("cors");
const PORT = 5000;

//middlewares
app.use(cors());
app.use("/zuri-backend-s1", route);

console.log(new Date());
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
