import React from "react";

const InPlaceMenu = ({ children }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      role="menu"
      tabIndex="0"
      className="flex pointer-events-auto bg-gray-400 rounded-lg absolute flex-col w-30 h-48 overflow-y-scroll no-scrollbar"
    >
      {children}
    </div>
  );
};

InPlaceMenu.defaultProps = {
  onBlur: () => {
    console.log("blured");
  },
};
export default InPlaceMenu;
