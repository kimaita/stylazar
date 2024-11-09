import React, { useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { PostListView } from '../components/PostListView';

export const PostListContainer = () => {
  const { 
    posts, 
    loading, 
    error, 
    page, 
    totalPages, 
    fetchPosts, 
    cleanup 
  } = usePosts();

  useEffect(() => {
    fetchPosts();
    return cleanup;
  }, [fetchPosts, cleanup]);

  const handlePageChange = (event, pageNumber) => {
    fetchPosts(pageNumber);
  };

  return (
    <PostListView
      posts={posts}
      loading={loading}
      error={error}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};