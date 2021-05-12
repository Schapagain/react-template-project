import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { useNotificationContext } from "../../contexts/NotificationContext";
import { useForm } from "../../hooks/";
import { TextBox, Alert, SubmitButton } from "../../design-system/form";
import classNames from "classnames";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Login() {
  const { isAuthenticated, signupUser, isLoading } = useAuthContext();
  const { notification, addNotification, clearNotifications } =
    useNotificationContext();
  const [user, setUser] = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password === user.password_repeat) {
      signupUser(user);
    } else {
      addNotification({
        id: uuid(),
        msg: "Passwords don't match",
        type: "warning",
        action: "signup",
      });
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (notification?.msg) {
      const { type, action } = notification;
      if (type === "success" && action === "signup") {
        setTimeout(() => history.push("/login"), 2000);
      }
      return () => clearNotifications();
    }
  }, [notification]);

  const classes = classNames(
    "flex flex-col w-full md:w-1/2 items-center mx-auto justify-center"
  );
  return isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <form className={classes} onSubmit={handleSubmit}>
      <TextBox
        placeholder="Pick a username"
        name="username"
        onChange={setUser}
        required={true}
        hasError={notification?.field === "username"}
      />
      <TextBox
        placeholder="Choose a password"
        type="password"
        name="password"
        onChange={setUser}
        required={true}
        hasError={notification?.field === "password"}
      />
      <TextBox
        placeholder="Re-enter password"
        type="password"
        name="password_repeat"
        onChange={setUser}
        required={true}
        hasError={notification?.field === "password"}
      />
      <SubmitButton className="mt-0.5" isLoading={isLoading}>
        Sign Up
      </SubmitButton>
      {notification?.action === "signup" && <Alert {...notification} />}
      <Link to="/login" className="text-xs underline">
        Login instead?
      </Link>
    </form>
  );
}
