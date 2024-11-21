import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import Editor from "../components/editor/PostEditor";
import { usePosts } from "../hooks/usePosts";
import AppAppBar from "../components/AppAppBar";
import Typography from "@mui/material/Typography";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { loading, error, fetchPostById, updatePost } = usePosts();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (err) {
        // navigate("/posts");
        throw new Error("Failed to load post");
      }
    };

    loadPost();
  }, [id, navigate, fetchPostById]);

  const handleSave = async (postData) => {
    try {
      await updatePost(id, postData);
      navigate(`/posts/${id}`);
    } catch (err) {
      throw new Error("Failed to save post");
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
        <Typography variant="h5" gutterBottom>
          Editing Post
        </Typography>
        <Editor post={post} onSave={handleSave} isLoading={loading} />
      </Box>
    </>
  );
};

export default PostEdit;
