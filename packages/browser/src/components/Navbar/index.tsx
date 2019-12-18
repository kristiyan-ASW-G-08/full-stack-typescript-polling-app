import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Logo from "assets/logo.svg";

const Navbar: FC = ({ children }) => {
  return (
    <header className="flex items-center">
      <div>
        <img className="h-8" src={Logo} alt="" />
      </div>
      <nav>
        <NavLink to="/" className="text-grey-200" activeClassName={""}>
          Link
        </NavLink>
        <NavLink to="/" className="text-grey-200" activeClassName={""}>
          Other Link
        </NavLink>
        <NavLink to="/" className="text-grey-200" activeClassName={""}>
          Third Link
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
