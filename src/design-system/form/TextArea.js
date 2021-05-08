import React from "react";
import classNames from "classnames";

const TextArea = React.forwardRef(
  ({ type = "text", size = "md", className, ...rest }, ref) => {
    const inputClasses = classNames(className, {
      "border border-1 rounded-sm border-gray-500": true,
      "text-black": true,
      "focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-60": true,
      "transition duration-300 ease-out": true,
      "border border-1 border-gray-400": true,
      "text-md px-3 py-1": size === "lg",
      "text-base px-2 py-1": size === "md",
      "text-sm p-1": size === "sm",
    });

    return (
      <textarea ref={ref} className={inputClasses} type={type} {...rest} />
    );
  }
);

export default TextArea;
