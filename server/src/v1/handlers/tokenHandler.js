const JWT = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

//クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const beare = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(beare, TOKEN_SECRET_KEY);
      return decodedToken;
    } catch (e) {
      return false;
    }
  }
  return false;
};

//JWTを検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    // そのJWTと一致するユーザーを探してくる
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json({
        errors: { message: "ユーザーが見つかりません" },
      });
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json({
      errors: { message: "tokenが見つかりません" },
    });
  }
};
