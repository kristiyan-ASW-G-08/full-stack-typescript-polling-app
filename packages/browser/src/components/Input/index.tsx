import React, { FC } from "react";
import { FastField, ErrorMessage } from "formik";

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  component?: "input" | "textarea";
  testId?: string | boolean;
}

export const Input: FC<InputProps> = ({
  name,
  placeholder,
  type,
  component = "input",
  testId = false
}) => (
  <div className="mb-4">
    <FastField
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name={name}
      type={type}
      placeholder={placeholder}
      component={component}
      data-testid={testId}
    />
    <ErrorMessage
      component="label"
      name={name}
      className="text-red-500 font-semibold py-2 px-2"
    />
  </div>
);

export default Input;
