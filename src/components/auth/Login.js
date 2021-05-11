import React from "react";
import { Redirect } from "react-router";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useForm } from "../hooks/";
import { TextBox, Alert, SubmitButton } from "../design-system/form";
import classNames from "classnames";
import { useAuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { isAuthenticated, loginUser } = useAuthContext();
  const { notification } = useNotificationContext();
  const [user, setUser] = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);
  };

  const classes = classNames(
    "flex flex-col w-full md:w-1/2 items-center mx-auto justify-center"
  );
  return isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <form className={classes} onSubmit={handleSubmit}>
      <TextBox placeholder="username" name="username" onChange={setUser} />
      <TextBox
        placeholder="password"
        type="password"
        name="password"
        onChange={setUser}
      />
      <SubmitButton>Log In</SubmitButton>
      {notification?.msg && <Alert {...notification} />}
    </form>
  );
}
