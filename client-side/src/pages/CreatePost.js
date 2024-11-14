import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Typography } from "@mui/material";
import Editor from "../components/PostEditor";
import { usePosts } from "../hooks/usePosts";
import AppAppBar from "../components/AppAppBar";

const CreatePost = () => {
  const navigate = useNavigate();
  const { loading, error, createPost } = usePosts();

  const handleSave = async (postData) => {
    try {
      const resp = await createPost(postData);
      navigate(`/posts/${resp.slug}`);
    } catch (err) {
      throw new Error("Failed to create post");
    }

  };


  return (
    <>
      <AppAppBar />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box>
        <Typography variant="h4" gutterBottom>
          New Blog Post
        </Typography>
        <Editor onSave={handleSave} isLoading={loading} />
      </Box>
    </>
  );
};
export default CreatePost;
