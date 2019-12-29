import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import NavLink from "./index";

const history = createMemoryHistory();

jest.spyOn(history, "push");

describe("NavLink", () => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  const links = [
    { to: "/", content: "Home" },
    { to: "/login", content: "Log in" },
    { to: "/signup", content: "SignUp" }
  ];
  it.each(links)("render NavLink", ({ to, content }) => {
    expect.assertions(3);

    const { container, getByText } = render(
      <NavLink to={to} content={content} />,
      {
        wrapper: ({ children }) => <Router history={history}>{children}</Router>
      }
    );

    expect(container).toBeTruthy();

    const navLink = getByText(content);

    userEvent.click(navLink);

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith({
      hash: "",
      pathname: to,
      search: "",
      state: null
    });
  });
});
