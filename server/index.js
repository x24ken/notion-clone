const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
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
const User = require("./src/v1/models/user");

// expressにjson形式を理解させる
const express = require("express");
const app = express();
app.use(express.json());

//テスト
app.get("/", (req, res) => {
  res.send("topページ");
});

// ユーザー新規登録API
app.post(
  "/register",
  //バリデーションチェック
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上必要です"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは８文字以上必要です"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは８文字以上必要です"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザーはすでに使われています");
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); //ミドルウェアの場合はここにnext()を置く
  },
  (req, res) => {
    // バリデーションエラーの受け取り

    // パスワードの暗号化
    const password = req.body.password;
    const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY);
    req.body.password = encryptedPassword;
    try {
      // console.log(req.body);
      // ユーザーの新規作成”
      const user = new User(req.body);
      user.save((err) => {
        if (err) return console.error(err);
        // saved!
      });
      // console.log(user);
      // JWTの発行
      const payload = {
        user: user._id,
      };
      const option = {
        expiresIn: "24h",
      };
      const token = JWT.sign(payload, TOKEN_SECRET_KEY, option);
      console.log(user);
      return res.status(200).json({ user, token });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

app.listen(PORT, () => {
  console.log("ローカルサーバー立ち上げ中");
});
