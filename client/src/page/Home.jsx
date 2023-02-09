import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import memoApi from "../api/memoApi";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const createMemo = async () => {
    try {
      setIsLoading(true);
      const res = await memoApi.create();
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        onClick={createMemo}
        loading={isLoading}
      >
        最初のメモを作る
      </LoadingButton>
    </Box>
  );
};

export default Home;
