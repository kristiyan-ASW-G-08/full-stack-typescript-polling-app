import React, { FC, useContext } from "react";
import axios from "axios";
import { Formik, FormikValues, FormikActions, FieldArray } from "formik";
import pollValidator from "validators/pollValidator";
import Input from "components/Input";
import FormWrapper from "components/FormWrapper";
import Button from "components/Button";
import { AuthContext } from "contexts/AuthContext";
import { NotificationContext } from "contexts/NotificationContext";
import { useHistory } from "react-router-dom";
import formErrorHandler from "utilities/formErrorHandler";

export const PollForm: FC = () => {
  const { authState } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const history = useHistory();
  const submitHandler = async (
    formValues: FormikValues,
    { setErrors }: FormikActions<FormikValues>
  ): Promise<void> => {
    try {
      const options = formValues.options.map(
        ({ value }: { value: string; id: string }) => value
      );
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/polls`,
        { ...formValues, options },
        {
          headers: { Authorization: `bearer ${authState.token}` }
        }
      );
      const { pollId } = response?.data?.data;
      history.push(`/polls/${pollId}`);
    } catch (error) {
      formErrorHandler(error, setErrors, setNotification);
    }
  };
  return (
    <Formik
      validationSchema={pollValidator}
      initialValues={{
        name: "",
        description: "",
        endDate: "",
        options: []
      }}
      onSubmit={submitHandler}
    >
      {({ values: { options }, errors, setFieldError }) => (
        <FormWrapper>
          <Input name="name" type="text" placeholder="Name" />
          <Input name="description" type="text" placeholder="Description" />
          <Input name="endDate" type="date" placeholder="End Date" />
          <FieldArray name="options">
            {({ push, remove }) => (
              <>
                {typeof errors?.options === "string" ? (
                  <p className="text-red-500 font-semibold py-2 px-2">
                    {errors.options}
                  </p>
                ) : (
                  ""
                )}
                {options.map(({ id }, index) => (
                  <div key={id}>
                    <Input
                      testId={`option-${index}`}
                      name={`options[${index}].value`}
                      type="text"
                      placeholder="Poll Option"
                    />
                    <Button onClick={() => remove(index)}>Remove</Button>
                  </div>
                ))}

                <div className="flex items-center justify-between">
                  <button
                    className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Create Poll
                  </button>
                  <button
                    onClick={() => {
                      if (options.length < 4) {
                        push({ id: Date.now(), value: "" });
                      } else {
                        setFieldError(
                          "options",
                          "the maximum  number of  options is 4"
                        );
                      }
                    }}
                    className="text-gray-500 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Add option
                  </button>
                </div>
              </>
            )}
          </FieldArray>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default PollForm;
