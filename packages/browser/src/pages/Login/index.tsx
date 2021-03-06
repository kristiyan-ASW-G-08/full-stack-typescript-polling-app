import React, { FC, useContext } from "react";
import axios from "axios";
import { Formik, FormikValues, FormikActions } from "formik";
import { useHistory } from "react-router-dom";
import UserLoginValidator from "@poll/common/source/validators/loginValidator";
import formErrorHandler from "utilities/formErrorHandler";
import Input from "components/Input";
import FormWrapper from "components/FormWrapper";
import { AuthContext } from "contexts/AuthContext";
import { NotificationContext } from "contexts/NotificationContext";

export const Login: FC = () => {
  const { login } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const history = useHistory();
  const submitHandler = async (
    formValues: FormikValues,
    { setErrors }: FormikActions<FormikValues>
  ): Promise<void> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/user/login`,
        formValues
      );
      login(response.data?.data);
      history.push("/");
    } catch (error) {
      formErrorHandler(error, setErrors, setNotification);
    }
  };
  return (
    <Formik
      validationSchema={UserLoginValidator}
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={submitHandler}
    >
      <FormWrapper>
        <Input name="email" type="email" placeholder="Email address" />

        <Input name="password" type="password" placeholder="Password" />

        <div className="flex items-center justify-between">
          <button
            className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
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

export default Login;
