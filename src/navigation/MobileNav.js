import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Brand, LogoutLink } from "./Navbar";
let navItems = [
  {
    displayText: "Home",
    link: "/home",
  },
  {
    displayText: "About",
    link: "/about",
  },
];

function NavItem({ className = "", link, tab, displayText }) {
  const history = useHistory();
  const currentPage = location && location.pathname;
  return (
    <li
      className={`${className} ${
        link === currentPage ? `bg-theme text-white` : ""
      } px-4 py-2 mt-1`}
      onClick={(e) => {
        e.preventDefault();
        history.push(link + (tab || ""));
      }}
    >
      {displayText}
    </li>
  );
}

const Hamburger = ({ onClick, open }) => {
  const barClasses =
    "block absolute h-0.5 w-5 bg-current mx-auto transform transition duration-500 ease-in-out";
  return (
    <button
      className="text-white select-none z-50 w-12 h-12 relative focus:outline-none bg-theme rounded-full"
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <div className="absolute top-1/2 left-1/2 block w-5 transform -translate-x-1/2">
        <span
          aria-hidden="true"
          className={`${barClasses} ${
            open ? "rotate-135" : "-translate-y-1.5"
          }`}
        ></span>
        <span
          aria-hidden="true"
          className={`${barClasses} ${(open && "opacity-0") || ""}`}
        ></span>
        <span
          aria-hidden="true"
          className={`${barClasses} ${
            open ? "-rotate-135" : "translate-y-1.5"
          }`}
        ></span>
      </div>
    </button>
  );
};

const MobileNav = ({ location }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    setMenuVisible(false);
    return () => setMenuVisible(false);
  }, [location]);
  return (
    <div className="md:hidden text-center text-sm overscroll-none fixed right-5 top-6 z-50">
      <Hamburger
        onClick={() => setMenuVisible(!menuVisible)}
        open={menuVisible}
      />
      <input className="hidden" type="checkbox" value={menuVisible} />
      <div
        className={`${
          menuVisible ? "flex" : "hidden"
        } fixed top-0 left-0 w-screen h-screen bg-white z-40`}
      >
        <div className="flex flex-col w-1/2 mx-auto">
          <Brand />
          <div>
            <ul className="py-5 flex flex-col">
              <li className="my-auto py-2">
                <LogoutLink />
              </li>
              {navItems.map((navItem) => (
                <NavItem key={navItem.displayText} {...navItem} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
