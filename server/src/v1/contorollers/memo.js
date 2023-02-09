const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    // メモを全てさがしてきてcountで数を数えてる
    const memoCount = await Memo.find().count();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch (err) {
    console.log("getAllでのエラー");
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { memoId } = req.params;
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { memoId } = req.params;
    // const { title } = req.body;
    // 何もタイトルがつけられなかった場合は無題とする
    // title === "" && (req.body.title = "無題");
    const updateMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });

    return res.status(200).json(updateMemo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  console.log("削除するぞ");
  try {
    const { memoId } = req.params;
    await Memo.deleteOne({ _id: memoId });
    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};
