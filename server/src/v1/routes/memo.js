const router = require("express").Router();
const memoController = require("../contorollers/memo");
const tokenHandler = require("../handlers/tokenHandler");

// memoからエンドポイント始まります

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// 投稿したメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

// メモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// メモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// メモを1つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;
