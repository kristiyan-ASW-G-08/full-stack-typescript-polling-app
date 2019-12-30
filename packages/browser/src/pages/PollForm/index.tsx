import React, { FC } from "react";
import axios from "axios";
import { Formik, FormikValues, FormikActions, FieldArray } from "formik";
import pollValidator from "validators/pollValidator";
import transformValidationErrors from "utilities/transformValidationErrors";
import Input from "components/Input";
import FormWrapper from "components/FormWrapper";

export const PollForm: FC = () => {
  const submitHandler = async (
    formValues: FormikValues,
    { setErrors }: FormikActions<FormikValues>
  ): Promise<void> => {
    try {
      console.log("nani");
      console.log(formValues);
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.data &&
        Array.isArray(error.response.data.data)
      ) {
        setErrors(transformValidationErrors(error.response.data.data));
      } else {
        console.log({ ...error });
      }
    }
  };
  return (
    <Formik
      validationSchema={pollValidator}
      initialValues={{
        name: "",
        description: "",
        options: []
      }}
      onSubmit={submitHandler}
    >
      {({ values: { options } }) => (
        <FormWrapper>
          <Input name="name" type="text" placeholder="Name" />
          <Input name="description" type="text" placeholder="Description" />
          {/* <FieldArray name="options">
            {({ push, remove }) => (
              <>
                 {options.map(({ id }, index) => (
                  <div key={id}>
                    <Input
                      name={`options[${index}].value`}
                      type="text"
                      placeholder="Poll Option"
                    />
                    <button
                      onClick={() => remove(index)}
                      className="text-gray-500 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => push({ id: Date.now(), value: "" })}
                  className="text-gray-500 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Add option
                </button>
              </>
            )}
          </FieldArray> */}
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Poll
            </button>
          </div>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default PollForm;
