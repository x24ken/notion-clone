import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    // JWTを持っているか確認する
    const checkAuth = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated();

      if (!user) {
        navigation("/login");
      } else {
        // ユーザーを保存する
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [dispatch, navigation]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
