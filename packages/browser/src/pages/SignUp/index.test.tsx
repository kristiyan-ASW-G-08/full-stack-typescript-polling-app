import React from "react";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import axios from "axios";
import { createMemoryHistory } from "history";
import SignUp from ".";

jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;

const history = createMemoryHistory();

jest.spyOn(history, "push");

describe("SignUp", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.restoreAllMocks);
  it("successful sign up", async () => {
    axiosMock.post.mockResolvedValue({ data: {}, status: 200 });
    expect.assertions(8);
    const password = "passwordpassword";
    const credentials = [
      { value: "newUsername", placeholder: "Username" },
      {
        value: "testmail@test.test",
        placeholder: "Email address"
      },
      {
        value: password,
        placeholder: "Password"
      },
      {
        value: password,
        placeholder: "Repeat Password"
      }
    ];
    const { getByText, getByPlaceholderText } = render(<SignUp />, {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>
    });

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      expect(input).toHaveAttribute("value", value);
    });

    const submitButton = getByText("Sign Up");

    UserEvent.click(submitButton);

    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          confirmationPassword: "passwordpassword",
          email: "testmail@test.test",
          password: "passwordpassword",
          username: "newUsername"
        }
      );
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith("/login");
    });
  });

  it("unsuccessful sign up", async () => {
    const validationErrors = [
      { path: "email", message: "Must be a valid email address" },
      { path: "username", message: "Must be a valid username" },
      { path: "password", message: "Must be a valid password" },
      { path: "confirmPassword", message: "Passwords do not match" }
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
      { value: "newUsername", placeholder: "Username" },
      {
        value: "testmail@test.test",
        placeholder: "Email address"
      },
      {
        value: password,
        placeholder: "Password"
      },
      {
        value: password,
        placeholder: "Repeat Password"
      }
    ];
    const { getByText, getByPlaceholderText } = render(<SignUp />, {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>
    });

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      expect(input).toHaveAttribute("value", value);
    });

    const submitButton = getByText("Sign Up");

    UserEvent.click(submitButton);

    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          confirmationPassword: "passwordpassword",
          email: "testmail@test.test",
          password: "passwordpassword",
          username: "newUsername"
        }
      );
      expect(history.push).not.toHaveBeenCalled();
    });
  });
});
