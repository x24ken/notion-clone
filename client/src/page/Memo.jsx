import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemos } from "../redux/features/memosSlice";
import EmojiPicker from "../components/common/EmojiPicker";
const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [timer, setTimer] = useState(null);
  const memos = useSelector((state) => state.memos.value);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (err) {
        console.error(err);
      }
    };
    getMemo();
  }, [memoId]);

  // useEffect フックは、コンポーネントがアンマウントされたときにタイマーをクリアするために使用されます。
  // そのため、コンポーネントが DOM から削除された後でも実行されないようになります。(by ChatGPT)
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  const updateTitle = async (e) => {
    clearTimeout(timer);
    setTitle(e.target.value);
    const newTimer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title });
        console.log("タイトルのセーブが完了しました");
      } catch (err) {
        console.error(err);
      }
    }, 1000);
    setTimer(newTimer);
  };

  const updateDescription = async (e) => {
    const description = e.target.value;
    setDescription(description);
    try {
      await memoApi.update(memoId, { description });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMemo = async () => {
    try {
      await memoApi.delete(memoId);
      const newMemos = memos.filter((memo) => memo._id !== memoId);
      dispatch(setMemos(newMemos));
      if (newMemos.length === 0) {
        navigation("/memo");
      } else {
        navigation(`/memo/${newMemos[0]._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onIconChange = async (newIcon) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemos(temp));
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": {
                padding: 0,
              },
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              ".MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: 700,
              },
            }}
          />
          <TextField
            onChange={updateDescription}
            value={description}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": {
                padding: 0,
              },
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              ".MuiOutlinedInput-root": {
                fontSize: "1rem",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
