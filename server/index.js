const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5001;
require("dotenv").config();
// http://localhost:5001/

// DB接続
const password = "ZwpmSb7KlTHORoK9";
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中・・・");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー立ち上げ中");
});
