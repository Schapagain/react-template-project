import React from "react";
import classNames from "classnames";

export default function TextBox({
  type = "text",
  size = "md",
  className,
  hasError,
  ...rest
}) {
  const inputClasses = classNames(className, {
    "text-black rounded-sm": true,
    "focus:outline-none focus:ring-2 focus:ring-blue-300": true,
    "transition duration-300 ease-out": true,
    "border border-1 border-gray-400": true,
    "text-md px-3 py-3": size === "lg",
    "text-sm px-3 py-2": size === "md",
    "text-xs p-1 py-2": size === "sm",
    "ring-2 ring-red-400": hasError,
  });

  return <input className={inputClasses} type={type} {...rest} />;
}
