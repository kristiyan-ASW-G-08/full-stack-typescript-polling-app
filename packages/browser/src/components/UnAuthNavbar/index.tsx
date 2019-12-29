import React, { FC } from "react";
import Navbar from "components/Navbar";
import NavLink from "components/NavLink";

const UnAuthNavbar: FC = () => {
  return (
    <Navbar>
      <NavLink to="/" content="Home" />
      <NavLink to="/login" content="Log In" />
      <NavLink to="/signup" content="Sign Up" />
    </Navbar>
  );
};

export default UnAuthNavbar;
