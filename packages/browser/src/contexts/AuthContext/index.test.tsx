import React, { useContext } from "react";
import { render, wait } from "@testing-library/react";
import {
  AuthContext,
  AuthContextProvider,
  defaultAuthState
} from "contexts/AuthContext";
import userEvent from "@testing-library/user-event";
import { reducers } from "contexts/AuthContext/reducer";
import AuthState from "types/AuthState";

const authenticatedAuthState = {
  token: "mockToken",
  user: {
    username: "John Doe",
    _id: "mockId",
    voted: [],
    polls: [],
    date: ""
  }
};

describe("AuthContext", () => {
  afterEach(() => jest.clearAllMocks());
  it("login", async () => {
    jest.spyOn(reducers, "login");
    jest.spyOn(reducers, "logout");
    let currentAuthState: AuthState;
    const TestComponent = () => {
      const { authState, login, logout } = useContext(AuthContext);
      currentAuthState = authState;
      return (
        <div>
          <button type="button" onClick={() => login(authenticatedAuthState)}>
            login
          </button>
          <button type="button" onClick={() => logout()}>
            logout
          </button>
        </div>
      );
    };
    const { getByText } = render(<TestComponent />, {
      wrapper: ({ children }) => (
        <AuthContextProvider>{children}</AuthContextProvider>
      )
    });

    await wait(() => {
      expect(currentAuthState).toEqual(defaultAuthState);
    });

    const loginButton = getByText("login");
    const logoutButton = getByText("logout");
    userEvent.click(loginButton);
    await wait(() => {
      expect(reducers.login).toHaveBeenCalledTimes(1);
      expect(reducers.logout).not.toHaveBeenCalled();
      expect(currentAuthState).toEqual(authenticatedAuthState);
    });

    userEvent.click(logoutButton);

    await wait(() => {
      expect(reducers.login).toHaveBeenCalledTimes(1);
      expect(reducers.logout).toHaveBeenCalledTimes(1);
      expect(currentAuthState).toEqual(defaultAuthState);
    });
  });
});
