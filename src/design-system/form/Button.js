import React, { forwardRef } from "react";
import classNames from "classnames";
import Loading from "../loading/LoadingDots";

const Button = forwardRef(
  (
    {
      size = "lg",
      text,
      variant = "default",
      borderColor = "theme",
      color = "theme",
      className = "",
      icon,
      onClick,
      isLoading,
    },
    ref
  ) => {
    const mainClass = classNames(className, {
      "pointer-events-none": isLoading,
      "flex block relative justify-center items-center h-fit-content": true,
      "text-xs text-center": variant !== "text-only",
      "outline-none focus:outline-none": true,
      "transition duration-300 ease-in-out": true,
      "text-md": variant === "text-only" && size === "lg",
      "text-sm": variant === "text-only" && size === "md",
      "text-xs": variant === "text-only" && size === "sm",
      "py-3 px-10": variant !== "text-only" && size === "lg",
      "py-3 px-5": variant !== "text-only" && size === "md",
      "p-1": variant !== "text-only" && size === "sm",

      [`border-2 text-${borderColor}-light hover:bg-opacity-70 hover:text-${borderColor}-dark border-${borderColor}`]:
        variant === "bordered",
      [`bg-${color} text-white hover:opacity-80`]: variant === "default",
      [`bg-transparent hover:text-${color}-light text-${color}`]:
        variant === "text-only",
    });
    return (
      <button
        ref={ref}
        className={mainClass}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {icon && <p className="mx-2 my-auto">{icon}</p>}
        <p>{text}</p>
        {isLoading && <Loading size="30px" position="absolute" />}
      </button>
    );
  }
);

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
