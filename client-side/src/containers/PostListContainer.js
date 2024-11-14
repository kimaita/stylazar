import React, { useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostListView } from "../components/PostListView";

export const PostListContainer = () => {
  const { posts, loading, error, page, totalPages, fetchPosts, cleanup } =
    usePosts();

  useEffect(() => {
    const load = async () => {
      await fetchPosts({});
    };
    load();
    return cleanup;
  }, [fetchPosts, cleanup]);

  const handlePageChange = (event, pageNum) => {
    fetchPosts({ pageNum });
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
