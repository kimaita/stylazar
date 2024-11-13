import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useContext, useMemo } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken_] = useState(sessionStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     authService.setupInterceptors();
  //   }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      sessionStorage.setItem("accessToken", token);
    }
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

  useEffect(() => {
    if (authService.isAuthenticated()) {
      authService
        .getCurrentUser()
        .then((authUser) => {
          setUser(authUser);
        })
        .catch(() => {
          console.warn("Expired token, refreshing.");
          authService
            .refreshToken()
            .then(() => {
              authService.getCurrentUser().then((authUser) => {
                setUser(authUser);
              });
            })
            .catch((error) => {
              console.error(
                "Failed to refresh, try sign in again. Error:",
                error
              );
            });
        });
      setLoading(false);
    }
  }, []);

  const signup = async (userData) => {
    authService.signup(userData).then(() => {
      signin({ username: userData.email, password: userData.password });
    });
  };

  const signin = async (credentials) => {
    authService
      .signin(credentials.username, credentials.password)
      .then((authUser) => {
        setUser(authUser);
      });
  };

  const signout = async () => {
    await authService.signout();
    setUser(null);
  };

  const value = { contextValue, user, loading, signup, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
