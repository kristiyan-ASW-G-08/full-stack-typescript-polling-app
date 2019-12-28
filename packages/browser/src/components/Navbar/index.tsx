import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "assets/logo.svg";

interface Link {
  path: string;
  content: string;
}
interface NavbarProps {
  links: Link[];
}
const Navbar: FC<NavbarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <header className="flex items-center justify-between px-4 py-2">
        <div>
          <img className="h-8" src={Logo} alt="" />
        </div>
        <nav className="flex items-center hidden lg:flex">
          {links.map(({ path, content }) => (
            <NavLink
              key={path}
              to={path}
              className="text-grey-200 block  px-4 py-"
              activeClassName="text-teal-400"
            >
              {content}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? "times" : "bars"} />
        </button>
      </header>
      {isOpen ? (
        <nav className="p-4 py-2 lg:hidden">
          {links.map(({ path, content }) => (
            <NavLink
              key={path}
              to={path}
              className="px-1 py-1 text-grey-200 block 
              font-semibold
              rounded hover:bg-teal-400 hover:text-white"
              activeClassName="text-teal-400"
            >
              {content}
            </NavLink>
          ))}
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
