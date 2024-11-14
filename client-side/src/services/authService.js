import api from "./api";

export const authService = {
  getCurrentUser: async () => {
    const resp = await api.get("/users/me");

    if (resp.status !== 200) {
      throw new Error("Failed to get user data");
    }
    return resp.data;
  },

  signup: async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      if (response.status === 201) return response.data;
      else {
        const error = new Error("Registration failed");
        error.status = response.status;
        error.cause = response.data;
        throw error;
      }
    } catch (error) {
      if (!error.status) error.status = 0;
      throw error;
    }
  },

  signin: async (username, password) => {
    try {
      const resp = await api.post(
        "/login/access_token",
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (resp.status !== 200) {
        const error = new Error("Authentication failed");
        error.status = resp.status;
        throw error;
      }
      const token = resp.data.access_token;
      sessionStorage.setItem("accessToken", token);
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    } catch (error) {
      if (!error.status) error.status = 0;

      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post("/refresh-token");
      if (response.status !== 200) {
        const error = new Error("Token refresh failed");
        error.status = response.status;
        throw error;
      }
      sessionStorage.setItem("accessToken", response.data.access_token);
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  },

  validateToken: async (token) => {
    try {
      const resp = await api.post("/validate-token",null, { params: { token } });
      if (resp.status === 200) return resp.data;
    } catch (err) {
      console.error(err);
    }
  },

  signout: async () => {
    try {
      await api.delete("/logout");
    } finally {
      sessionStorage.removeItem("accessToken");
    }
  },

  getAccessToken: () => {
    return sessionStorage.getItem("accessToken");
  },

  isAuthenticated: () => {
    const accessToken = authService.getAccessToken();
    return !!accessToken;
  },

  //   Add interceptors to automatically add auth headers
  setupInterceptors: () => {
    api.interceptors.request.use(
      async (config) => {
        const accessToken = authService.getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await authService.refreshToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  },
};
