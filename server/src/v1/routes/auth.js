const router = require("express").Router();
const { body } = require("express-validator");
const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../contorollers/user");
const tokenHandler = require("../handlers/tokenHandler");

// ユーザー新規登録API
router.post(
  "/register",
  //バリデーションチェック
  [
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
  ],
  // バリデーションエラーの受け取り
  validation.validate,
  // Userの登録
  userController.register
);

// ログイン認証API
router.post(
  "/login",
  // バリデーションチェック
  [
    body("username")
      .isLength({ min: 8 })
      .withMessage("ユーザー名は8文字以上必要です"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("パスワードは８文字以上必要です"),
  ],
  // バリデーションエラーの受け取り
  validation.validate,
  // Userの登録
  userController.login
);

//JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
