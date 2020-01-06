import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Poll from "./index";

const history = createMemoryHistory();

jest.spyOn(history, "push");

describe("Poll", () => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  it("render Poll", () => {
    expect.assertions(4);
    const poll = {
      name: "PollName",
      description: "PollDescription",
      _id: "id",
      creator: "",
      date: "",
      endDate: ""
    };
    const { queryByText, getByTestId } = render(<Poll poll={poll} />, {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>
    });

    const pollName = queryByText(poll.name);
    const pollDescription = queryByText(poll.description);
    const pollLink = getByTestId(`poll-${poll._id}`);

    expect(pollName).toBeTruthy();
    expect(pollDescription).toBeTruthy();

    userEvent.click(pollLink);
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith(`/polls/${poll._id}`);
  });
});
