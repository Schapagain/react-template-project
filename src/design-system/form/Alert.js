import classNames from "classnames";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { BiErrorCircle } from "react-icons/bi";

/**
 *
 * @param {*} props
 * @param {String} props.text - Text to be displayed in the alert
 * @param {String} [props.type="success"] - [success | failure | warning]
 *
 * @returns
 */
export default function Alert({ className, msg, type = "success", onClick }) {
  const classes = classNames(
    className,
    "p-2 my-2 text-center flex items-center rounded-lg flex w-full",
    "animate-fade-in relative",
    {
      "bg-green-300": type === "success",
      "bg-red-300": type === "failure",
      "bg-yellow-400": type === "warning",
    }
  );
  return (
    <p onClick={onClick} className={classes}>
      {type === "success" ? (
        <AiOutlineCheckCircle />
      ) : type === "failure" ? (
        <VscError />
      ) : (
        <BiErrorCircle />
      )}
      <span className="ml-2">{msg}</span>
    </p>
  );
}

Alert.defaultProps = {
  onClick: () => null,
};
