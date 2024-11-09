import React from "react";
import { Typography, Pagination, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PostCard from "./SinglePostCard";
import { useNavigate } from "react-router-dom";

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Grid container spacing={2} columns={12}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
            <PostCard
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
        onChange={(e, value) => onPageChange(value)}
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        variant="outlined" shape="rounded"
      />
    </>
  );
};
