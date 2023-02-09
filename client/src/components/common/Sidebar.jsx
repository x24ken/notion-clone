import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { setMemos } from "../../redux/features/memosSlice";
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memos.value);
  // URLのパラメータからuseParamsを使って持ってくるReactRouterのhooks
  const { memoId } = useParams();
  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigation("./login");
  };
  // メモを取得する
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemos(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  //クリックされたメモのインデックスを取ってくる
  useEffect(() => {
    const activeIndex = memos.findIndex((memo) => memo._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigation]);

  const createMemo = async () => {
    try {
      const res = await memoApi.create();
      dispatch(setMemos([...memos, res]));
      navigation(`memo/${res._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // 後でvariantの値を変えて挙動を見てみる
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        {/* ログアウト */}
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        {/* お気に入り */}
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        {/* プライベート */}
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton onClick={createMemo}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos &&
          memos.map((memo, index) => {
            return (
              <ListItemButton
                sx={{ pl: "20px" }}
                component={Link}
                to={`/memo/${memo._id}`}
                key={memo._id}
                selected={index === activeIndex}
              >
                <Typography>
                  {memo.icon}
                  {memo.title}
                </Typography>
              </ListItemButton>
            );
          })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
