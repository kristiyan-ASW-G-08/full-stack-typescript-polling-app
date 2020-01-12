import React from "react";
import { render, wait, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import axios from "axios";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "contexts/AuthContext";
import getPoll from "utilities/getPoll";
import PollForm from ".";

jest.mock("axios");
jest.mock("utilities/getPoll");
const pollId = "mockId";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    pollId: "mockId"
  })
}));

const axiosMock = axios as jest.Mocked<typeof axios>;
const getPollMock = getPoll as jest.MockedFunction<typeof getPoll>;

const history = createMemoryHistory();

jest.spyOn(history, "push");

describe("PollForm", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.restoreAllMocks);
  it("successful  submit", async () => {
    expect.assertions(4);

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
        `${process.env.REACT_APP_API_URL}/polls/${pollId}/options/${options[1]._id}/votes`,
        {},
        {
          headers: { Authorization: `bearer ${token}` }
        }
      );
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith(`/polls/${pollId}/results`);
    });
  });
});
