import api from "./api";
/**
 * Implements API operations for posts
 */
export const PostService = {
  /**
   *
   * @param {*} page
   * @param {*} count
   * @returns
   */
  getPostsList: async (page, count = 20) => {
    try {
      const resp = await api.get("/posts/", {
        params: {
          offset: page,
          limit: count,
        },
      });
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Retrieve signed in user's posts
   * @param {int} page
   * @param {int} count
   */
  getOwnPosts: async (page, count = 20) => {
    try {
      const resp = await api.get("/users/me/posts", {
        params: {
          offset: page,
          limit: count,
        },
      });
      if (resp.status === 200) return resp.data;
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * Retrieve a user's posts
   * @param {String} user_id
   * @param {int} page
   * @param {int} count
   */
  getUserPosts: async (userID, page, count = 20) => {
    try {
      const resp = await api.get(`/users/${userID}/posts`, {
        params: {
          offset: page,
          limit: count,
        },
      });
      if (resp.status === 200) return resp.data;
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Fetches a post given its ID
   * @param {*} postID
   * @returns
   */
  loadPost: async (postID) => {
    try {
      const resp = await api.get(`/posts/${postID}`);
      return resp.data;
    } catch (error) {}
  },

  /**
   * Creates a new post
   * @param {FormData} formData
   * @returns
   */
  createPost: async (formData) => {
    try {
      const resp = await api.post("/posts/", formData);
      if (resp.status === 201) return resp.data;
    } catch (error) {}
  },

  /**
   *
   * @param {String} postID
   * @param {*} newPost
   * @returns
   */
  updatePost: async (postID, newPost) => {
    try {
      const resp = await api.patch(`/posts/${postID}`, newPost);
      if (resp.status === 200) return resp.data;
    } catch (error) {}
  },

  /**
   * Deletes a post given the ID
   * @param {*} postID ID of the post to delete
   */
  deletePost: async (postID) => {
    try {
      const resp = await api.delete(`/posts/${postID}`);
      if (resp.status === 201) return true;
    } catch (error) {}
  },
  /**
   *
   * @param {*} postID
   * @param {*} upvoted
   */
  postReact: async (postID, upvoted = true) => {
    try {
      const resp = await api.post(`/posts/${postID}/like`, { upvoted });
      if (resp.status === 201) return resp.data;
    } catch (error) {}
  },

  /**
   *
   * @param {*} postID
   * @param {*} comment
   * @returns
   */
  commentPost: async (postID, comment) => {
    try {
      const resp = await api.post(`/posts/${postID}/comment`, {
        body: comment,
      });
      if (resp.status === 201) return resp.data;
    } catch (error) {}
  },

  /**
   *
   * @param {*} postID
   */
  sharePost: async (postID) => {
    try {
      const resp = await api.get(`/posts/${postID}/share`);
      if (resp.status === 200) return resp.data;
    } catch (error) {}
  },
};
