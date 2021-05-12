import React from "react";
import { Redirect } from "react-router";
import { useNotificationContext } from "../../contexts/NotificationContext";
import { useForm } from "../../hooks/";
import { TextBox, Alert, SubmitButton } from "../../design-system/form";
import classNames from "classnames";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { isAuthenticated, loginUser, isLoading } = useAuthContext();
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
      <TextBox
        placeholder="Username"
        name="username"
        onChange={setUser}
        required={true}
      />
      <TextBox
        placeholder="Password"
        type="password"
        name="password"
        onChange={setUser}
        required={true}
      />
      <SubmitButton className="mt-0.5" isLoading={isLoading}>
        Log In
      </SubmitButton>
      {notification?.action === "login" && <Alert {...notification} />}
      <Link to="/signup" className="text-xs underline">
        Signup instead?
      </Link>
    </form>
  );
}
