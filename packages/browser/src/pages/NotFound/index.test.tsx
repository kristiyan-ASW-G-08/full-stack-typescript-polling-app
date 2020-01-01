import React from "react";
import { render, wait } from "@testing-library/react";";
import UserEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import NotFound from ".";

describe("NotFound", () => {
  afterAll(jest.restoreAllMocks);
  it("renders", async () => {
    const history = createMemoryHistory();

    jest.spyOn(history, "goBack");
    jest.spyOn(history, "push");

    expect.assertions(3);

    const { getByText } = render(<NotFound />, {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>
    });

    const prevButton = getByText("Go Back");

    UserEvent.click(prevButton);

    await wait(() => {
      expect(history.goBack).toHaveBeenCalledTimes(1);
    });

    const homeButton = getByText("Home");
    UserEvent.click(homeButton);

    await wait(() => {
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });
});
