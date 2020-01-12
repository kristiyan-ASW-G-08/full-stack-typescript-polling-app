import React from "react";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import axios from "axios";
import { createMemoryHistory } from "history";
import { AuthContext } from "contexts/AuthContext";
import formErrorHandler from "utilities/formErrorHandler";
import Login from ".";

jest.mock("utilities/formErrorHandler");

const formErrorHandlerMock = formErrorHandler as jest.MockedFunction<
  typeof formErrorHandler
>;
jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;
const data = { user: {}, token: "mockToken" };
axiosMock.post.mockReturnValueOnce(
  Promise.resolve({ data: { data }, status: 200 })
);

const history = createMemoryHistory();

jest.spyOn(history, "push");

const login = jest.fn();

describe("Login", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.restoreAllMocks);
  it("successful log in", async () => {
    expect.assertions(8);
    const password = "passwordpassword";
    const credentials = [
      {
        value: "testmail@test.test",
        placeholder: "Email address"
      },
      {
        value: password,
        placeholder: "Password"
      }
    ];
    const { getByText, getByPlaceholderText } = render(<Login />, {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ login }}>
          <Router history={history}>{children}</Router>
        </AuthContext.Provider>
      )
    });

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      expect(input).toHaveAttribute("value", value);
    });

    const submitButton = getByText("Log In");

    UserEvent.click(submitButton);

    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/users/user/login`,
        {
          email: "testmail@test.test",
          password: "passwordpassword"
        }
      );
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toHaveBeenCalledWith(data);
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith("/");
    });
  });

  it("unsuccessful log in", async () => {
    const validationErrors = [
      { path: "email", message: "Must be a valid email address" },
      { path: "password", message: "Must be a valid password" }
    ];
    axiosMock.post.mockRejectedValue({
      response: {
        data: { data: validationErrors }
      },
      status: 400
    });
    expect.assertions(7);
    const password = "passwordpassword";
    const credentials = [
      {
        value: "testmail@test.test",
        placeholder: "Email address"
      },
      {
        value: password,
        placeholder: "Password"
      }
    ];
    const { getByText, getByPlaceholderText } = render(<Login />, {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ login }}>
          <Router history={history}>{children}</Router>
        </AuthContext.Provider>
      )
    });

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      expect(input).toHaveAttribute("value", value);
    });

    const submitButton = getByText("Log In");

    UserEvent.click(submitButton);

    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/users/user/login`,
        {
          email: "testmail@test.test",
          password: "passwordpassword"
        }
      );
      expect(login).not.toHaveBeenCalled();
      expect(history.push).not.toHaveBeenCalled();
    });
    expect(formErrorHandlerMock).toHaveBeenCalledTimes(1);
  });
});
