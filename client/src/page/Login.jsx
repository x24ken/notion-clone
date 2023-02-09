import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Login = () => {
  const navigation = useNavigate();
  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ボタンを押す時はエラーメッセージは空に
    setUsernameErrorText("");
    setPasswordErrorText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let error = false;

    if (username === "") {
      setUsernameErrorText("ユーザー名を入力してください");
      error = true;
    }

    if (password === "") {
      setPasswordErrorText("パスワードを入力してください");
      error = true;
    }

    if (error) return;

    setLoading(true);
    // 新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");
      navigation("/");
    } catch (err) {
      setLoading(false);
      const errors = err.response.data.errors;
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrorText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrorText(err.msg);
        }
      });
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          name="username"
          required
          margin="normal"
          helperText={usernameErrorText}
          error={usernameErrorText === "" ? false : true}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          type="password"
          required
          margin="normal"
          helperText={passwordErrorText}
          error={passwordErrorText === "" ? false : true}
          disabled={loading}
        />

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
