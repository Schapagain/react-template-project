import React from "react";
import classNames from "classnames";

export default function Tile({
  title,
  hoverDescription,
  description,
  onClick,
}) {
  const mainClass = classNames(
    " relative w-full h-32 m-2",
    "cursor-pointer rounded-lg transition duration-500 ease",
    "hover:text-white hover:bg-gray-700 bg-gray-300",
    "flex flex-col justify-between items-center text-center"
  );

  const hoverInfoClasses = classNames(
    "transition-opacity duration-500 ease transform opacity-0 hover:opacity-100",
    "absolute inset-0 z-20 "
  );
  return (
    <div onClick={onClick} className={mainClass}>
      <div className="h-1/6 p-1">
        <h1 className="text-sm truncate">{title}</h1>
      </div>
      <div className="relative w-full h-5/6">
        <p className="text-xs text-gray-700 absolute inset-0 z-10">
          {description}
        </p>
        <div className={hoverInfoClasses}>
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <p className="text-xs">{hoverDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Tile.defaultProps = {
  onClick: () => null,
};
