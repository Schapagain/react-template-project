import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const Brand = () => {
  return (
    <Link className="font-blod text-3xl" to="/">
      Lapse
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

const NavLinks = ({ isHome }) => {
  return (
    <div className="hidden md:flex">
      {!isHome && (
        <NavLink>
          <Link to="/home">Home</Link>
        </NavLink>
      )}
      <NavLink>
        <Link to="/about">About</Link>
      </NavLink>

      <NavLink>
        <LogoutLink />
      </NavLink>
    </div>
  );
};

const NavBar = ({ location }) => {
  return (
    <div className="flex bg-page fixed top-0 z-30 w-full mt-5 md:mt-0 max-w-screen-xl justify-between items-center p-3">
      <Brand />
      <NavLinks isHome={location.pathname === "/home"} />
    </div>
  );
};

export default NavBar;
