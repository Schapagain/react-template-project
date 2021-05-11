import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export const Brand = () => {
  return (
    <Link className="font-blod text-3xl" to="/home">
      Brand
    </Link>
  );
};

const NavLink = ({ children }) => {
  return (
    <div
      className="p-2 font-medium text-theme text-lg mx-4
            transition ease-in-out duration-700 hover:bg-theme hover:text-white rounded-xl"
    >
      {children}
    </div>
  );
};

export const LogoutLink = () => {
  const { isAuthenticated, logoutUser } = useAuthContext();
  const handleLogout = () => {
    logoutUser();
  };
  return isAuthenticated ? (
    <Link to="/" onClick={handleLogout}>
      Logout
    </Link>
  ) : (
    <Link to="/login">Login</Link>
  );
};

const NavLinks = () => {
  return (
    <div className="hidden md:flex">
      <NavLink>
        <Link to="/about">About</Link>
      </NavLink>
      <NavLink>
        <LogoutLink />
      </NavLink>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="w-full mt-5 md:mt-0 items-center z-30 max-w-screen-xl flex p-3 justify-between">
      <Brand />
      <NavLinks />
    </div>
  );
};

export default NavBar;
