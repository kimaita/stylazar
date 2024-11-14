import React from "react";
import {
  Typography,
  Pagination,
  CircularProgress,
  Stack,
  Container,
  Icon,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FeedPostCard from "./FeedPostCard";
import { useNavigate } from "react-router-dom";
import { ErrorOutlineOutlined } from "@mui/icons-material";

export const PostListView = ({
  posts,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Container maxWidth="sm">
        <Stack
          spacing={3}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            p: 4,
          }}
        >
          <ErrorOutlineOutlined sx={{ fontSize: 96 }} />
          <Typography variant="h3" color="textSecondary" align="center">
            Failed to load
          </Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <>
      <Grid container spacing={2} columns={12}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={post.id}>
            <FeedPostCard
              blogPost={post}
              onPostClick={handlePostClick}
              onAuthorClick={handleAuthorClick}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, page) => onPageChange(page)}
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
};
