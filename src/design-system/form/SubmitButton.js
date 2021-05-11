import React from "react";
import classNames from "classnames";
import Loading from "../loading/LoadingDots";

export default function SubmitButton({
  size = "lg",
  children,
  variant = "default",
  borderColor = "theme",
  color = "theme",
  className = "",
  isLoading,
}) {
  const mainClass = classNames(className, {
    "flex relative justify-center items-center text-xs": true,
    "outline-none focus:outline-none": true,
    "transition duration-300 ease-in-out": true,
    "py-3 px-10": size === "lg",
    "py-3 px-5": size === "md",
    "p-1": size === "sm",
    "pointer-events-none": isLoading,

    [`border-2 text-${borderColor}-light hover:bg-opacity-70 hover:text-${borderColor}-dark border-${borderColor}`]:
      variant === "bordered",
    [`bg-${color} text-white hover:opacity-80`]: variant === "default",
  });
  return (
    <button type="submit" className={mainClass}>
      <div>{children}</div>
      {isLoading && <Loading color={color} />}
    </button>
  );
}
