import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import UnAuthNavbar from "./index";

const history = createMemoryHistory();

jest.spyOn(history, "push");

describe("UnAuthNavbar", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetAllMocks);
  const links = [
    { to: "/", content: "Home" },
    { to: "/login", content: "Log In" },
    { to: "/signup", content: "Sign Up" }
  ];
  it.each(links)("", ({ to, content }) => {
    expect.assertions(2);
    const { getByText } = render(<UnAuthNavbar />, {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>
    });

    const linkElement = getByText(content);

    userEvent.click(linkElement);

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith({
      hash: "",
      pathname: to,
      search: "",
      state: null
    });
  });
});
