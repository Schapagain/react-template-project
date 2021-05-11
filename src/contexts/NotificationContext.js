import React, { createContext, useReducer } from "react";
import notificationReducer from "./notificationReducer";
import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from "./types";
import { makeContextHook } from "./utils";

const initialState = {
  id: "", // unique identifier to micro manage notifications
  msg: "", // text to display to the user
  type: "", // success, warning, or failure - used as a prop to Alert
  action: "", // login, register or other strings clarifying context of the message
};

export const NotificationContext = createContext(initialState);

export const useNotificationContext = makeContextHook(
  "useNotificationContext",
  NotificationContext
);

const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  function addNotification(notification) {
    console.log("adding notification:", notification);
    dispatch({
      type: ADD_NOTIFICATION,
      payload: notification,
    });
  }

  function clearNotifications() {
    dispatch({
      type: CLEAR_NOTIFICATIONS,
    });
  }

  return (
    <NotificationContext.Provider
      value={{
        notification: state,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
