import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function CustomLink({
  text,
  color = "theme",
  className = "",
  href,
  newTab = false,
  type = "internal",
  children,
}) {
  const mainClass = classNames(className, {
    "text-center w-fit-content inline-block": true,
    "outline-none focus:outline-none": true,
    "transition duration-300 ease-in-out": true,
    [`bg-transparent hover:text-${color}-light text-${color}`]: true,
  });
  const linkProps = {
    className: mainClass,
    target: type === "external" || newTab ? "_blank" : "",
    rel: "noopener noreferrer",
  };

  return type === "external" ? (
    <a {...linkProps} href={href || "#"}>
      {text}
    </a>
  ) : (
    <Link to={href || "#!"} {...linkProps}>
      <p>{text}</p>
      {children}
    </Link>
  );
}
