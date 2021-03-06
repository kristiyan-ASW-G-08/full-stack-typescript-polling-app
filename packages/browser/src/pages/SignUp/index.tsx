import React, { FC, useContext } from "react";
import axios from "axios";
import { Formik, FormikValues, FormikActions } from "formik";
import { useHistory } from "react-router-dom";
import UserSignUpValidator from "@poll/common/source/validators/signUpValidator";
import Input from "components/Input";
import FormWrapper from "components/FormWrapper";
import { NotificationContext } from "contexts/NotificationContext";
import formErrorHandler from "utilities/formErrorHandler";

export const SignUp: FC = () => {
  const history = useHistory();
  const { setNotification } = useContext(NotificationContext);
  const submitHandler = async (
    formValues: FormikValues,
    { setErrors }: FormikActions<FormikValues>
  ): Promise<void> => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, formValues);
      history.push("/login");
    } catch (error) {
      formErrorHandler(error, setErrors, setNotification);
    }
  };
  return (
    <Formik
      validationSchema={UserSignUpValidator}
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmationPassword: ""
      }}
      onSubmit={submitHandler}
    >
      <FormWrapper>
        <Input name="username" type="text" placeholder="Username" />

        <Input name="email" type="email" placeholder="Email address" />

        <Input name="password" type="password" placeholder="Password" />

        <Input
          name="confirmationPassword"
          type="password"
          placeholder="Repeat Password"
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>

          <button
            className="text-gray-500 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Forgot your password?
          </button>
        </div>
      </FormWrapper>
    </Formik>
  );
};

export default SignUp;
