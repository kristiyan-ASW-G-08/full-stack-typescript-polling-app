import React from "react";
import { render, wait, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import axios from "axios";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "contexts/AuthContext";
import getPoll from "./getPoll";
import PollForm from ".";

jest.mock("axios");
jest.mock("./getPoll");

const axiosMock = axios as jest.Mocked<typeof axios>;
const getPollMock = getPoll as jest.MockedFunction<typeof getPoll>;

const history = createMemoryHistory();

jest.spyOn(history, "push");
const latitude = "someLatitude";
const longitude = "someLongitude";

// @ts-ignore
global.navigator = {
  geolocation: {
    getCurrentPosition: jest.fn(onSuccess => {
      onSuccess({
        coords: {
          latitude,
          longitude
        }
      });
    })
  }
};

describe("PollForm", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.restoreAllMocks);
  it("successful  submit", async () => {
    // expect.assertions(6);
    const pollId = "mockId";
    const options = [
      { _id: "firstId", name: "React", poll: pollId, date: "", votes: 0 },
      { _id: "secondId", name: "Angular", poll: pollId, date: "", votes: 0 }
    ];

    getPollMock.mockResolvedValue({
      options,
      poll: {
        _id: pollId,
        creator: "",
        name: "",
        description: "",
        date: "",
        endDate: ""
      }
    });
    const token = "mockToken";
    axiosMock.post.mockResolvedValue({
      data: { data: { pollId } },
      status: 200
    });

    const { getByText, getByTestId } = render(<PollForm />, {
      wrapper: ({ children }) => (
        <AuthContext.Provider
          value={{ authState: { token, user: { voted: [] } } }}
        >
          <Router history={history}>{children}</Router>
        </AuthContext.Provider>
      )
    });
    const firstOptions = await waitForElement(() =>
      getByTestId(`option-${options[0]._id}`)
    );
    const secondOption = await waitForElement(() =>
      getByTestId(`option-${options[1]._id}`)
    );

    userEvent.click(firstOptions);
    userEvent.click(secondOption);
    const submitButton = getByText("Vote");

    userEvent.click(submitButton);

    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/polls/${pollId}/options/${options[0]._id}/votes`
      );
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith(`/polls/${pollId}/results`);
    });
  });
  //   it("unsuccessful  submit", async () => {
  //     const token = "mockToken";
  //     axiosMock.post.mockRejectedValue({
  //       data: { data: {} },
  //       status: 400
  //     });
  //     expect.assertions(5);
  //     const options = ["React", "Angular", "Vue"];
  //     const credentials = [
  //       { value: "Framework Showdown", placeholder: "Name" },
  //       {
  //         value: "What framework do you use?",
  //         placeholder: "Description"
  //       }
  //     ];
  //     const { getByText, getByPlaceholderText, getByTestId } = render(
  //       <PollForm />,
  //       {
  //         wrapper: ({ children }) => (
  //           <AuthContext.Provider value={{ authState: { token } }}>
  //             <Router history={history}>{children}</Router>
  //           </AuthContext.Provider>
  //         )
  //       }
  //     );

  //     credentials.forEach(({ value, placeholder }) => {
  //       const input = getByPlaceholderText(placeholder);
  //       userEvent.type(input, value);
  //       expect(input).toHaveAttribute("value", value);
  //     });

  //     const endDateInput = getByPlaceholderText("End Date");
  //     const endDate = "2109-10-10";
  //     fireEvent.change(endDateInput, { target: { value: endDate } });

  //     const addOptionButton = getByText("Add option");
  //     // eslint-disable-next-line no-restricted-syntax
  //     for await (const option of options) {
  //       userEvent.click(addOptionButton);
  //       const optionInput = await waitForElement(() =>
  //         getByTestId(`option-${options.indexOf(option)}`)
  //       );
  //       userEvent.type(optionInput, option);
  //     }
  //     const submitButton = getByText("Create Poll");

  //     userEvent.click(submitButton);

  //     await wait(() => {
  //       expect(axios.post).toHaveBeenCalledTimes(1);
  //       expect(axios.post).toHaveBeenCalledWith(
  //         `${process.env.REACT_APP_API_URL}/polls`,
  //         {
  //           name: credentials[0].value,
  //           description: credentials[1].value,
  //           endDate,
  //           options
  //         },
  //         {
  //           headers: { Authorization: `bearer ${token}` }
  //         }
  //       );
  //       expect(history.push).not.toHaveBeenCalled();
  //     });
  //   });
});
