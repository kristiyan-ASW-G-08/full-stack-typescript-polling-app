import React, { FC } from "react";
import { Form } from "formik";

export const FormWrapper: FC = ({ children }) => {
  return (
    <section
      style={{ minHeight: "70vh" }}
      className="flex items-center justify-center px-4"
    >
      <Form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">
        {children}
      </Form>
    </section>
  );
};

export default FormWrapper;
