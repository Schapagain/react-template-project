import { saveToLocalStorage } from "../utils";
import { LOGOUT, LOGIN, LOGIN_FAIL, SIGNUP_FAIL } from "./types";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      const { user, token } = action.payload || {};
      saveToLocalStorage({ token });
      saveToLocalStorage({ user });
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
