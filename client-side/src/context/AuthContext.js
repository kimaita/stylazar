import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../services/api";
import { authService } from "../services/authService";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken_] = useState(authService.getAccessToken());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.debug("no cookie");
      authService.refreshToken().catch((error) => {
        console.error("Failed to refresh, try sign in again. Error:", error);
      });
    } else if (!authService.validateToken(token)) {
      console.debug("expired cookie");
      authService.refreshToken().catch((error) => {
        console.error("Failed to refresh, try sign in again. Error:", error);
      });
    }

    setToken(authService.getAccessToken());

    api.defaults.headers.common["Authorization"] = "Bearer " + authService.getAccessToken();
    // authService.setupInterceptors()

    authService
      .getCurrentUser()
      .then((authUser) => {
        setUser(authUser);
      })
      .catch((err) => {
        console.error("Failed to fetch user", err.message);
      });
    setLoading(false);
  }, [token]);

  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  const signup = async (userData) => {
    authService.signup(userData).then(() => {
      signin({ username: userData.email, password: userData.password });
    });
  };

  const signin = useCallback(async (credentials) => {
    setError(null);
    try {
      await authService.signin(credentials.username, credentials.password);
      authService.getCurrentUser().then((authUser) => {
        setUser(authUser);
      });
    } catch (error) {
      setError(error);
    }
  }, []);

  const signout = useCallback(async () => {
    try {
      await authService.signout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = { contextValue, user, loading, error, signup, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
