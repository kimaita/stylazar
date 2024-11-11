import {
  Avatar,
  Button,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/pic-about-01.jpg";

const PostContentTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Varela, sans-serif",
  fontSize: "1.1rem",
}));

const PostTitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Lora, sans-serif",
}));

function formatDate(published_at) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const date = new Date(published_at);
  return date.toLocaleString("en-GB", options);
}

const placeholder_byline =
  "Quisque scelerisque, sem ultrices finibus pretium, eros ipsum tristique magna, nec condimentum lacus odio at neque. Suspendisse tellus dui, sagittis vitae lobortis sit amet, blandit sed quam. Nulla lectus mauris, hendrerit ac augue.";

export default function PostDetail({ post }) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 2 }}>
      <PostTitleTypography variant="h1" gutterBottom>
        {post?.title}
      </PostTitleTypography>
      <PostContentTypography
        variant="subtitle2"
        mb={2}
        sx={{ fontStyle: "italic" }}
      >
        {post?.byline || placeholder_byline}
      </PostContentTypography>
      <CardMedia
        component="img"
        height="256"
        image={banner}
        alt="Post Header"
      />
      <Divider sx={{ mt: 2, mb: 3 }} />

      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Chip
          variant="outlined"
          size="medium"
          color="primary"
          onClick={() => navigate(`/authors/${post?.author.user_id}`)}
          avatar={
            <Avatar alt={post?.author.name} src={post?.author.profile_url} />
          }
          label={post?.author.name}
        />
        <Typography variant="overline">
          {formatDate(post?.published_at)}
        </Typography>
      </Stack>
      {post?.tags && (
        <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      )}

      <PostContentTypography
        variant="body1"
        sx={{ my: 3 }}
        dangerouslySetInnerHTML={{ __html: post?.body }}
      />
    </Paper>
  );
}
