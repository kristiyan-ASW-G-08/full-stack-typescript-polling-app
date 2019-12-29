import { FormikValues, FormikErrors } from "formik";
import ValidationError from "@poll/common/source/types/ValidationError";

const transformValidationErrors = (
  validationErrors: ValidationError[]
): FormikErrors<FormikValues> => {
  return validationErrors.reduce(
    (acc: { [key: string]: string }, { path, message }: ValidationError) => {
      return {
        ...acc,
        [path]: message
      };
    },
    {}
  );
};

export default transformValidationErrors;
