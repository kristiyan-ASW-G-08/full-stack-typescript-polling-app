import React, { FC, SyntheticEvent } from "react";

interface ButtonProps {
  onClick?: (e: SyntheticEvent) => void;
}
const Button: FC<ButtonProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-gray-500 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="button"
  >
    {children}
  </button>
);

export default Button;
