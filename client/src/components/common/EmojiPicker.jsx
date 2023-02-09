import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ icon, onChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isShowPicker, setIsShowPicker] = useState(false);

  const showPicker = () => {
    setIsShowPicker((state) => !state);
  };

  const selectEmoji = (e) => {
    console.log(e);
    const { unified } = e;
    console.log(unified);
    const emoji = String.fromCodePoint(`0x${unified}`);
    setSelectedEmoji(emoji);
    setIsShowPicker(false);
    onChange(emoji);
  };

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Picker data={data} onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
