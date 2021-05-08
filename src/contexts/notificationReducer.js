import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from "./types";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { ...action.payload };
    case CLEAR_NOTIFICATIONS:
      return {
        id: null,
        msg: "",
        action: null,
        type: "",
      };
    default:
      return state;
  }
};

export default notificationReducer;
