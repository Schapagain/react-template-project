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
  const { notifications, addNotification, clearNotifications } =
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
    const notification = notifications.find((n) => n.scope === "signup");
    if (notification?.msg) {
      if (notification.type === "success") {
        setTimeout(() => history.push("/login"), 2000);
      }
      return () => clearNotifications("signup");
    }
  }, [notifications]);

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
      />
      <TextBox
        placeholder="Choose a password"
        type="password"
        name="password"
        onChange={setUser}
        required={true}
      />
      <TextBox
        placeholder="Re-enter password"
        type="password"
        name="password_repeat"
        onChange={setUser}
        required={true}
      />
      <SubmitButton className="mt-0.5" isLoading={isLoading}>
        Sign Up
      </SubmitButton>
      {notifications.map(
        (notification) =>
          notification.scope === "signup" && (
            <Alert key={notification.id} {...notification} />
          )
      )}
      <Link to="/login" className="text-xs underline">
        Login instead?
      </Link>
    </form>
  );
}
