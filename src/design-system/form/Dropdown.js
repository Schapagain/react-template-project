import React from "react";
import classNames from "classnames";
import { BiChevronsDown } from "react-icons/bi";
import { toTitleCase } from "../../utils";
import Loading from "../loading/Loading";

export default function Dropdown({
  options = [],
  currentValue,
  name,
  color,
  hoverColor,
  onChange,
  className = "",
  isLoading,
}) {
  const classes = classNames(className, {
    [`hover:bg-${hoverColor} hover:text-white`]: hoverColor,
    [`text-white bg-${color}`]: color,
    "text-black hover:opacity-80 pr-10 cursor-pointer appearance-none my-auto p-1.5 text-sm w-full": true,
    "focus:outline-none outline-none": true,
    "transition duration-300 ease-out relative": true,
  });

  return (
    <div
      className={`${color ? "text-white" : "text-gray-900"} relative my-auto`}
    >
      {isLoading && <Loading position="absolute" size="30px" />}
      <select
        name={name}
        value={currentValue}
        className={classes}
        onChange={onChange}
      >
        {options.map((option) => (
          <DropdownOption
            color={color}
            key={option.display || option.value}
            value={option.value}
            display={option.display}
            disabled={option.disabled}
          />
        ))}
      </select>

      <BiChevronsDown
        className={`absolute text-xl right-2 pointer-events-none top-1/2 transform -translate-y-1/2`}
      />
    </div>
  );
}

function DropdownOption({ value, color, display, disabled }) {
  return (
    <option
      className={`${color ? "text-white" : "text-gray-900"}`}
      value={value}
      disabled={disabled}
    >
      {display || toTitleCase(value.toString())}{" "}
    </option>
  );
}
