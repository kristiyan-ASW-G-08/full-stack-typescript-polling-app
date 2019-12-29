import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "assets/logo.svg";

const Navbar: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b ">
        <div>
          <img className="h-8" src={Logo} alt="" />
        </div>
        <nav className="flex items-center hidden lg:flex">{children}</nav>
        <button
          type="button"
          className="lg:hidden text-grey-500 "
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? "times" : "bars"} />
        </button>
      </header>
      {isOpen ? <nav className="p-4 py-2 lg:hidden">{children}</nav> : ""}
    </>
  );
};

export default Navbar;
