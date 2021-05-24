import classNames from "classnames";
import React from "react";

const Button = ({
  children,
  className,
  label,
  variant = "primary",
  size = "md",
  ...rest
}) => {
  const classes = classNames(
    className,
    "rounded-md text-center items-center justify-center hover:text-white p-2 transition-fast",
    {
      "bg-gray-300 hover:bg-theme": variant === "primary",
      "bg-red-500 hover:bg-red-600": variant === "danger",
      "w-32 text-md": size === "md",
      "w-26 text-sm": size === "sm",
    }
  );

  return (
    <div role="button" aria-label={label} className={classes} {...rest}>
      {children}
    </div>
  );
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
