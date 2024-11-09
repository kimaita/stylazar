import api from "./api";

export const authService = {
  getCurrentUser: async () => {
    return await api.get("/users/me").then((response) => response.data);
  },

  signup: async (userData) => {
    return api
      .post("/users/register", userData)
      .then((response) => response.data);
  },

  signin: async (username, password) => {
    const resp = await api.post(
      "/login/access_token",
      { username: username, password: password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    sessionStorage.setItem("accessToken", resp.data.access_token);
    return await authService.getCurrentUser();
  },

  refreshToken: async () => {
    const response = await api.post("/refresh-token");

    sessionStorage.setItem("accessToken", response.data.access_token);
  },

  signout: async () => {
    await api.delete("/logout");
    sessionStorage.removeItem("accessToken");
  },

  isAuthenticated: () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  },

  //   Add interceptors to automatically add auth headers
  setupInterceptors: () => {
    api.interceptors.request.use(
      async (config) => {
        const accessToken = sessionStorage.getItem("accessToken");
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
