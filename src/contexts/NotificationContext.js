import React, { createContext, useReducer } from "react";
import notificationReducer from "./notificationReducer";
import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from "./types";
import { makeContextHook } from "./utils";

const initialState = {
  id: "", // unique identifier to micro manage notifications
  msg: "", // text to display to the user
  type: "", // success, warning, or failure - used as a prop to Alert
  action: "", // login, register or other strings clarifying context of the message
  field: "", // useful in notifications regarding forms - error in specefic form field, for instance
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

  // [TODO] This is currently not doing anything, but can be useful
  // if we want to keep track of multiple notifications
  // in which case notification state should be a collection-like structure
  function removeNotification(id) {
    console.log("NOT IMPLEMENTED YET");
  }

  return (
    <NotificationContext.Provider
      value={{
        notification: state,
        addNotification,
        clearNotifications,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
