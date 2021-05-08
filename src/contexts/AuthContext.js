import React, { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import { useNotificationContext } from "./NotificationContext";
import { LOGIN, LOGOUT } from "./types";
import { makeContextHook } from "./utils";
import { v4 as uuid } from "uuid";
import { getFromLocalStorage } from "../utils";

const initialState = {
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

  function loginUser(user) {
    // [TODO] make an API call here
    if (user?.username === "admin" && user?.password === "admin123") {
      dispatch({
        type: LOGIN,
        payload: { user: { username: user.username }, token: "testToken123" },
      });
      clearNotifications();
    } else {
      addNotification({
        id: uuid(),
        msg: "Invalid Credentials",
        type: "failure",
        action: "login",
      });
    }
  }

  // Since value object below is recreated on every render
  // you could useMemo on it incase of performance bottlenecks
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        logoutUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
