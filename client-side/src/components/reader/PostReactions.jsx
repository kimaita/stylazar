import { Box, Stack } from "@mui/material";
import {
  BookmarkAddOutlined,
  ShareSharp,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import React from "react";

const Upvote = () => {
  <>
    <ThumbUpAltOutlined />
    <ThumbDownAltOutlined />
  </>;
};

const Save = () => {
  <BookmarkAddOutlined />;
};

const Share = () => {
  <ShareSharp />;
};

const PostReactions = () => {
  return (
    <Box sx={{ my: 4, mx: 2 }}>
      <Stack direction="row" spacing={3}></Stack>
    </Box>
  );
};

export default PostReactions;
