import reducer, { reducers } from "./reducer";
import { defaultAuthState } from ".";

describe("AuthContext reducer", () => {
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
  afterEach(() => jest.clearAllMocks());
  it("reducer calls the correct reducers", () => {
    jest.spyOn(reducers, "login");
    jest.spyOn(reducers, "logout");
    expect.assertions(4);

    reducer(defaultAuthState, {
      type: "login",
      payload: authenticatedAuthState
    });
    reducer(defaultAuthState, { type: "logout", payload: defaultAuthState });

    expect(reducers.login).toHaveBeenCalledTimes(1);
    expect(reducers.login).toHaveBeenCalledWith(authenticatedAuthState);

    expect(reducers.logout).toHaveBeenCalledTimes(1);

    expect(reducers.logout).toHaveBeenCalledWith(defaultAuthState);
  });

  it("login reducer should return the passed payload and set token and user in localStorage", () => {
    expect.assertions(3);
    jest.spyOn(window.localStorage, "setItem");
    window.localStorage.setItem = jest.fn();
    reducers.login(authenticatedAuthState);

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      1,
      "token",
      JSON.stringify(authenticatedAuthState.token)
    );
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      2,
      "user",
      JSON.stringify(authenticatedAuthState.user)
    );
  });
  it("logout reducer should return the passed payload and remove token and user in localStorage", () => {
    expect.assertions(3);
    jest.spyOn(window.localStorage, "removeItem");
    window.localStorage.removeItem = jest.fn();
    reducers.logout();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, "token");
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(2, "user");
  });
});
