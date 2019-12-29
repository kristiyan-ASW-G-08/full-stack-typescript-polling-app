import React, { FC } from "react";
import { NavLink as ReactRouterNavLink } from "react-router-dom";

interface Link {
  to: string;
  content: string;
}

const NavLink: FC<Link> = ({ to, content }) => {
  return (
    <ReactRouterNavLink
      exact
      to={to}
      className="text-gray-700 block  px-4 py-1"
      activeClassName="text-teal-400 "
    >
      {content}
    </ReactRouterNavLink>
  );
};

export default NavLink;
