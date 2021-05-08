import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Brand = () => {
  return (
    <Link className="font-blod text-3xl" to="/home">
      Brand
    </Link>
  );
};

const NavLink = ({ text, ...rest }) => {
  return (
    <Link
      className="p-2 font-medium text-theme text-lg mx-4
            transition ease-in-out duration-700 hover:bg-theme hover:text-white rounded-xl"
      {...rest}
    >
      {text}
    </Link>
  );
};

const NavLinks = () => {
  const { isAuthenticated, logoutUser } = useAuthContext();
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="hidden md:flex">
      <NavLink text="About" to="/about" />
      {isAuthenticated ? (
        <NavLink text="Logout" to="/" onClick={handleLogout} />
      ) : (
        <NavLink text="Login" to="/login" />
      )}
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="w-full items-center z-30 max-w-screen-xl flex p-3 justify-between">
      <Brand />
      <NavLinks />
    </div>
  );
};

export default NavBar;
