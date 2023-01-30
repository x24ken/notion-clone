import { Box, TextField } from "@mui/material";
import React from "react";

const Register = () => {
  return (
    <Box component="form">
      <TextField fullWidth id="username" label="お名前" />
    </Box>
  );
};

export default Register;
