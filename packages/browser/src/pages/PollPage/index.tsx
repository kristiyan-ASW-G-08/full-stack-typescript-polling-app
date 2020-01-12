import React, { FC, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Formik,
  FormikValues,
  FormikActions,
  Field,
  ErrorMessage
} from "formik";
import axios from "axios";
import Poll from "types/Poll";
import Option from "types/Option";
import { AuthContext } from "contexts/AuthContext";
import voteValidator from "validators/voteValidator";
import formErrorHandler from "utilities/formErrorHandler";
import { NotificationContext } from "contexts/NotificationContext";
import FormWrapper from "components/FormWrapper";
import getPoll from "../../utilities/getPoll";

const PollPage: FC = () => {
  const { pollId } = useParams();
  const history = useHistory();
  const {
    token,
    user: { voted }
  } = useContext(AuthContext).authState;
  const { setNotification } = useContext(NotificationContext);
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
  }, [history, pollId, voted]);

  const submitHandler = async (
    { option }: FormikValues,
    { setErrors }: FormikActions<FormikValues>
  ): Promise<void> => {
    try {
      console.log(option);
      console.log(
        `${process.env.REACT_APP_API_URL}/polls/${poll?._id}/options/${option}/votes`,
        token
      );
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/polls/${poll?._id}/options/${option}/votes`,
        {},
        {
          headers: { Authorization: `bearer ${token}` }
        }
      );
      console.log(response);
      history.push(`/polls/${pollId}/results`);
    } catch (error) {
      formErrorHandler(error, setErrors, setNotification);
    }
  };
  return (
    <Formik
      validationSchema={voteValidator}
      initialValues={{
        option: ""
      }}
      onSubmit={submitHandler}
    >
      {({ setFieldValue }) => (
        <FormWrapper>
          <Field
            name="option"
            render={({ field }: { field: any }) => (
              <div className="px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">
                {options?.length !== undefined
                  ? options.map(({ _id, name }) => {
                      return (
                        <div key={_id} className="mb-4">
                          <input
                            data-testid={`option-${_id}`}
                            {...field}
                            id={name}
                            value={_id}
                            checked={field.value === _id}
                            name={name}
                            type="radio"
                            onChange={() => setFieldValue("option", _id)}
                          />

                          <label id={name} htmlFor={name}>
                            {name}
                          </label>
                        </div>
                      );
                    })
                  : ""}
                <ErrorMessage
                  component="label"
                  name="option"
                  className="text-red-500 font-semibold py-2 px-2"
                />
              </div>
            )}
          />
          <button
            className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Vote
          </button>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default PollPage;
