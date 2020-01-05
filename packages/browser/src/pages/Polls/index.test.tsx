import React from "react";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useIntersection from "hooks/useIntersection";
import { BrowserRouter } from "react-router-dom";
import Polls from "./index";
import getPolls from "./getPolls";

jest.mock("hooks/useIntersection");
jest.mock("./getPolls");

const useIntersectionMock = useIntersection as jest.Mock<any>;
const setElement = jest.fn();
useIntersectionMock.mockReturnValue({ setElement });

const getPollsMock = getPolls as jest.Mock<any>;
const poll = { nane: "TestPoll", description: "Test description", _id: "id" };
getPollsMock.mockResolvedValue({
  newPolls: [poll],
  next: null,
  prev: null
});

describe("Polls", () => {
  const { REACT_APP_API_URL } = process.env;

  it("render Polls", async () => {
    expect.assertions(5);
    const { getByRole, getByTestId } = render(<Polls />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>
    });
    await wait(() => {
      expect(getPolls).toHaveBeenCalledTimes(1);
      expect(getPolls).toHaveBeenCalledWith(`${REACT_APP_API_URL}/polls`);
    });

    const pollsFeed = getByRole("feed");
    const pollElement = getByTestId(`poll-${poll._id}`);

    expect(getPolls).toHaveBeenCalledTimes(1);
    expect(pollsFeed.childElementCount).toBe(1);
    expect(pollElement).toBeTruthy();
  });
});
