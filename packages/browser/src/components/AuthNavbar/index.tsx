import React, { FC, useContext } from "react";
import Navbar from "components/Navbar";
import NavLink from "components/NavLink";
import { AuthContext } from "contexts/AuthContext";

const AuthNavbar: FC = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar>
      <NavLink to="/" content="Home" />
      <NavLink to="/poll" content="Create a new Poll" />
      <button
        onClick={logout}
        type="button"
        className="text-gray-700 block  px-4 py-1"
      >
        Log out
      </button>
    </Navbar>
  );
};

export default AuthNavbar;
