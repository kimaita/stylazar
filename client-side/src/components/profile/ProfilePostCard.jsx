import { Avatar, Box, Chip, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "../SinglePostCard";
import {
  EditNoteOutlined,
  PublicOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import formatDate from "../../utils";

function CardFooter({ post }) {
  function ChipStatus({ status }) {
    let icon, label, color;
    switch (status) {
      case "hidden":
        icon = <VisibilityOffOutlined />;
        label = "Hidden";
        color = "secondary";
        break;
      case "draft":
        icon = <EditNoteOutlined />;
        label = "Draft";
        color = "primary";
        break;
      default:
        icon = <PublicOutlined />;
        label = "Published";
        color = "success";
    }
    return (
      <Chip
        size="small"
        icon={icon}
        label={label}
        color={color}
        variant="outlined"
        sx={{ p: 0.6 }}
      />
    );
  }
  return (
    <Stack direction={"row"} spacing={2} sx={{ alignItems: "center", m: 2 }}>
      <ChipStatus
        status={
          post?.is_published ? (post?.is_public ? "hidden" : "public") : "draft"
        }
      />
      <Typography variant="caption">{formatDate(post?.updated_at)}</Typography>
    </Stack>
  );
}

export default function ProfilePostCard({ blogPost }) {
  return (
    <PostCard blogPost={blogPost} footer={<CardFooter post={blogPost} />} />
  );
}
