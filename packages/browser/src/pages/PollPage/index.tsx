import React, { FC, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, FormikValues, FormikActions, Field } from "formik";
import axios from "axios";
import Poll from "types/Poll";
import Option from "types/Option";
import { AuthContext } from "contexts/AuthContext";
import pollValidator from "validators/pollValidator";
import transformValidationErrors from "utilities/transformValidationErrors";
import Input from "components/Input";
import FormWrapper from "components/FormWrapper";
import Button from "components/Button";
import getPoll from "./getPoll";

const PollPage: FC = () => {
  const { pollId } = useParams();
  const history = useHistory();
  const {
    user: { voted }
  } = useContext(AuthContext).authState;
  const [poll, setPoll] = useState<Poll | null>(null);
  const [options, setOptions] = useState<Option[] | null>(null);

  useEffect(() => {
    getPoll(pollId || "")
      .then((response: { poll: Poll; options: Option[] }) => {
        if (voted.includes(response.poll._id)) {
          history.replace(`/polls/${response.poll._id}/results`);
          return;
        }
        setPoll(response.poll);
        setOptions(response.options);
      })
      .catch(console.log);
  });

  const submitHandler = async (
    formValues: FormikValues,
    { setErrors }: FormikActions<FormikValues>
  ): Promise<void> => {
    try {
      // const options = formValues.options.map(
      //   ({ value }: { value: string; id: string }) => value
      // );
      // const response = await axios.post(
      //   `${process.env.REACT_APP_API_URL}/polls`,
      //   { ...formValues, options },
      //   {
      //     headers: { Authorization: `bearer ${authState.token}` }
      //   }
      // );
      // const { pollId } = response?.data?.data;
      // history.push(`/polls/${pollId}`);
    } catch (error) {
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
        option: ""
      }}
      onSubmit={submitHandler}
    >
      <FormWrapper>
        <Field>
          {*//@ts-ignore *}
          {({ field }) => (
            <>
              {options !== null
                ? options.map(({ _id, name }) => (
                    <Input
                      key={_id}
                      name="option"
                      value={name}
                      checked={field.value === name}
                    />
                  ))
                : ""}
            </>
          )}
        </Field>
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Poll
          </button>
        </div>
      </FormWrapper>
    </Formik>
  );
};

export default PollPage;
