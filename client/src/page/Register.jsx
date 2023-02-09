import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  const navigation = useNavigate();
  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ボタンを押す時はエラーメッセージは空に
    setUsernameErrorText("");
    setPasswordErrorText("");
    setConfirmPasswordErrorText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let error = false;

    if (username === "") {
      setUsernameErrorText("ユーザー名を入力してください");
      error = true;
    }

    if (password === "") {
      setPasswordErrorText("パスワードを入力してください");
      error = true;
    }
    if (confirmPassword === "") {
      setConfirmPasswordErrorText("確認用パスワードを入力してください");
      error = true;
    }

    if (password !== confirmPassword) {
      setPasswordErrorText("パスワードと確認用パスワードが異なります");
      setConfirmPasswordErrorText("パスワードと確認用パスワードが異なります");
      error = true;
    }

    if (error) return;

    setLoading(true);
    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("新規作成に成功しました");
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
        if (err.param === "confirmPassword") {
          setConfirmPasswordErrorText(err.msg);
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
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          name="confirmPassword"
          type="password"
          required
          margin="normal"
          helperText={confirmPasswordErrorText}
          error={confirmPasswordErrorText === "" ? false : true}
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
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
