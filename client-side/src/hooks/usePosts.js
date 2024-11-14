import { useCallback, useRef, useState } from "react";
import { PostService } from "../services/postService";

const DEFAULT_PAGE_SIZE = 10;

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Use refs for mutable values that shouldn't trigger rerenders
  const abortController = useRef(null);

  const handleError = useCallback((err) => {
    setError(err);
  }, []);

  const withLoading = useCallback(
    async (operation) => {
      setLoading(true);
      setError(null);
      try {
        const result = await operation();
        return result;
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const addPost = useCallback((newPost) => {
    setPosts((posts) => [...posts, newPost]);
  }, []);

  const removePost = useCallback((postId) => {
    setPosts((posts) => posts.filter((post) => post.id !== postId));
  }, []);

  const updatePostInList = useCallback((updatedPost) => {
    setPosts((posts) =>
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  }, []);

  const fetchPosts = useCallback(
    async ({
      context = "feed",
      userID,
      pageNum = page,
      pageSize = DEFAULT_PAGE_SIZE,
    }) => {
      abortController.current?.abort();
      abortController.current = new AbortController();

      const apiCalls = {
        author: PostService.getUserPosts,
        own: PostService.getOwnPosts,
        feed: PostService.getPostsList,
      };

      const apiCall = apiCalls[context];
      return withLoading(async () => {
        const data = await apiCall(context === "author" ? userID : pageNum - 1);
        setPosts(data);
        setTotalPages(Math.ceil(data.length / pageSize));
        setPage(pageNum);
        return data;
      });
    },
    [withLoading, page]
  );

  const fetchPostById = useCallback(
    async (id) => {
      return withLoading(async () => {
        const data = await PostService.loadPost(id);
        return data;
      });
    },
    [withLoading]
  );

  const createPost = useCallback(
    async (postData) => {
      return withLoading(async () => {
        const newPost = await PostService.createPost(postData);
        addPost(newPost);
        return newPost;
      });
    },
    [withLoading, addPost]
  );

  const updatePost = useCallback(
    async (id, postData) => {
      return withLoading(async () => {
        const updatedPost = await PostService.updatePost(id, postData);
        updatePostInList(updatedPost);
        return updatedPost;
      });
    },
    [withLoading, updatePostInList]
  );

  const deletePost = useCallback(
    async (id) => {
      return withLoading(async () => {
        await PostService.deletePost(id);
        removePost(id);
      });
    },
    [withLoading, removePost]
  );

  // Cleanup function for abort controller
  const cleanup = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
    cleanup,
    page,
    totalPages,
    setPage,
  };
};
