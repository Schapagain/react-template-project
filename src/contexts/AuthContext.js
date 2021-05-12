import React, { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import { useNotificationContext } from "./NotificationContext";
import { AUTH_LOADING, LOGIN, LOGIN_FAIL, LOGOUT, SIGNUP } from "./types";
import { makeContextHook } from "./utils";
import { v4 as uuid } from "uuid";
import { getFromLocalStorage } from "../utils";
import api from "../utils/api";

const initialState = {
  isLoading: false,
  isAuthenticated: getFromLocalStorage("token"),
  user: getFromLocalStorage("user"),
  token: getFromLocalStorage("token"),
};

export const AuthContext = createContext(initialState);

export const useAuthContext = makeContextHook("useAuthContext", AuthContext);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { addNotification, clearNotifications } = useNotificationContext();
  function logoutUser() {
    dispatch({
      type: LOGOUT,
    });
  }

  async function loginUser(attemptedUser) {
    let token, user;
    dispatch({ type: AUTH_LOADING });
    try {
      ({
        data: { token, user },
      } = await api.post("/auth", attemptedUser));
      dispatch({ type: LOGIN, payload: { token, user } });
      clearNotifications();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL });
      addNotification({
        id: uuid(),
        msg: "Invalid Credentials",
        type: "failure",
        action: "login",
      });
    }
  }

  async function signupUser(newUser) {
    dispatch({ type: AUTH_LOADING });
    try {
      await api.post("/signup", newUser);
      addNotification({
        id: uuid(),
        msg: "Signup successfull! You may now log in. Redirecting...",
        type: "success",
        action: "signup",
      });
      dispatch({ type: SIGNUP });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL });
      addNotification({
        id: uuid(),
        msg: err.response.data?.error || "Something went wrong!",
        type: "failure",
        action: "signup",
        field: err.response.data?.field,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logoutUser,
        loginUser,
        signupUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
