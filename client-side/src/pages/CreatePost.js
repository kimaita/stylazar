import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Editor from '../components/PostEditor';
import { usePosts } from '../hooks/usePosts';

const CreatePost = () => {
  const navigate = useNavigate();
  const { loading, error, createPost } = usePosts();

  const handleSave = async (postData) => {
    try {
      const resp = await createPost(postData);
      navigate(`/posts/${resp.slug}`);
    } catch (err) {
      throw new Error('Failed to create post');
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Editor 
        onSave={handleSave}
        isLoading={loading}
      />
    </>
  );
};
export default CreatePost;
