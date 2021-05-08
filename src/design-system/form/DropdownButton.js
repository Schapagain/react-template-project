import React, { useEffect, useRef, useState } from "react";
import { toTitleCase } from "../../utils";
import { RiFileCopyLine } from "react-icons/ri";
import Button from "./Button";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function DropdownButton({
  options = [],
  color,
  text,
  onChange,
}) {
  const menuRef = useRef();
  const toggleRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [isOutside] = useOutsideClick(menuRef, toggleRef);
  useEffect(() => {
    if (isOutside) setOpen(false);
  }, [isOutside]);

  return (
    <div
      className={`${
        color ? "text-white" : "text-gray-900"
      } relative my-auto cursor-pointer`}
    >
      <Button
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="text-left"
        text={text}
        ref={toggleRef}
      />
      {isOpen && (
        <div
          aria-haspopup={true}
          ref={menuRef}
          className={`absolute p-1 z-30 w-full bottom-10 -left-10 bg-${color}`}
        >
          {options.map((option) => (
            <ButtonOption
              onClick={(value) => {
                onChange(value);
                setOpen(false);
              }}
              color={color}
              key={option.display || option.value}
              value={option.value}
              display={option.display}
              disabled={option.disabled}
            />
          ))}
        </div>
      )}

      <RiFileCopyLine
        className={`absolute text-sm left-1 top-1 pointer-events-none`}
      />
    </div>
  );
}

function ButtonOption({ value, color, onClick, display, disabled }) {
  return (
    <span
      onClick={() => onClick(value)}
      role="listitem"
      className={`block my-1 ${color ? "text-white" : "text-gray-900"}`}
      value={value}
      disabled={disabled}
    >
      {display || toTitleCase(value)}
    </span>
  );
}
