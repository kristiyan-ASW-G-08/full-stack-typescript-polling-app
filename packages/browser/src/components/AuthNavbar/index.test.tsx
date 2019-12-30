import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { AuthContext } from "contexts/AuthContext";
import AuthNavbar from "./index";

const history = createMemoryHistory();

jest.spyOn(history, "push");

describe("AuthNavbar", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetAllMocks);
  const logout = jest.fn();
  const links = [
    { to: "/", content: "Home" },
    { to: "/poll", content: "Create a new Poll" }
  ];
  it.each(links)(
    "links should calls history.push with the propper pathname",
    ({ to, content }) => {
      expect.assertions(2);
      const { getByText } = render(<AuthNavbar />, {
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
    }
  );
  it("logout button should call logout", () => {
    expect.assertions(1);
    const { getByText } = render(<AuthNavbar />, {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ logout }}>
          <Router history={history}>{children}</Router>
        </AuthContext.Provider>
      )
    });
    const logoutButton = getByText("Log out");

    userEvent.click(logoutButton);

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
