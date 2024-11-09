import { useState, useEffect } from "react";
import { PostService } from "../services/postService";

const usePostDetails = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const post = await PostService.loadPost(postId);
        setPost(post);
      } catch (err) {
        setError(err.message || "Failed to fetch post details");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostDetails();
    }

    return () => {
      // Cleanup if needed
      setPost(null);
      setLoading(false);
      setError(null);
    };
  }, [postId]);

  return { post, loading, error };
};

export default usePostDetails;
