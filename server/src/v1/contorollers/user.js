const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

exports.register = async (req, res) => {
  // パスワードの暗号化
  const { password } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY);
  req.body.password = encryptedPassword;

  try {
    const user = new User(req.body);
    await user.save();

    // JWTの発行
    const payload = {
      id: user._id,
    };
    const option = {
      expiresIn: "24h",
    };
    const token = JWT.sign(payload, TOKEN_SECRET_KEY, option);
    return res.status(200).json({ user, token }); //OK
  } catch (err) {
    console.log(err);
    return res.status(500).json(err); //Error
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // DBからユーザーがいるかどうかを探してくる
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            params: "username",
            msg: "ユーザー名が無効です",
          },
        ],
      });
    }

    //パスワードが合っているか照合する
    const descryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (!(descryptedPassword === password)) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    // JWTの発行
    const payload = {
      id: user._id,
    };
    const option = {
      expiresIn: "24h",
    };
    const token = JWT.sign(payload, TOKEN_SECRET_KEY, option);
    return res.status(201).json({ user, token }); //OK
  } catch (err) {
    return res.status(500).json(err); //Error
  }
};
