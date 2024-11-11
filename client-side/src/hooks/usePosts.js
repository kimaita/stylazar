import { useCallback, useRef, useState } from "react";
import { PostService } from "../services/postService";

// export const usePosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchPosts = useCallback(async (pageNum = 1) => {
//     try {
//       setLoading(true);
//       const posts = await PostService.getPostsList(pageNum);
//       const total = posts.length;
//       setPosts(posts);
//       setTotalPages(Math.ceil(total / 10));
//       setError(null);
//       setPage(pageNum);
//     } catch (err) {
//       setError(err.message || "Failed to fetch posts");
//       setPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return {
//     posts,
//     loading,
//     error,
//     page,
//     totalPages,
//     fetchPosts,
//     setPage,
//   };
// };

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
    async (pageNum = page, pageSize = DEFAULT_PAGE_SIZE) => {
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      return withLoading(async () => {
        const data = await PostService.getPostsList(pageNum);
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
