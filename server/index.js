const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const express = require("express");
const app = express();
app.use(express.json());
app.use("/api/v1", require("./src/v1/routes/auth"));
require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
// http://localhost:5001/

// DB接続
(async function () {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DBと接続中・・・");
  } catch (error) {
    console.log(error);
  }
})();

app.listen(PORT, () => {
  console.log("ローカルサーバー立ち上げ中");
});
