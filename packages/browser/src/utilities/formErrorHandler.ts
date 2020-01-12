import { SetStateAction } from "react";
import { FormikErrors, FormikValues } from "formik";
import transformValidationErrors from "utilities/transformValidationErrors";
import NotificationState, { notificationType } from "types/NotificationState";

const formErrorHandler = (
  error: any,
  setErrors: (errors: FormikErrors<FormikValues>) => void,
  setNotification: (
    content: string,
    type?: notificationType
  ) => SetStateAction<NotificationState>
) => {
  if (error?.response?.data?.data && Array.isArray(error.response.data.data)) {
    setErrors(transformValidationErrors(error.response.data.data));
  } else {
    setNotification("Something went wrong! Try again later.");
  }
};

export default formErrorHandler;
