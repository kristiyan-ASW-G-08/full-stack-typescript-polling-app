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

  // eslint-disable-next-line no-proto
  jest.spyOn(window.localStorage.__proto__, "setItem");
  // eslint-disable-next-line no-proto
  jest.spyOn(window.localStorage.__proto__, "removeItem");
  afterEach(jest.clearAllMocks);
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
    expect.assertions(2);

    reducers.login(authenticatedAuthState);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      1,
      "pollAppAuth",
      JSON.stringify({
        token: authenticatedAuthState.token,
        user: authenticatedAuthState.user
      })
    );
  });
  it("logout reducer should return the passed payload and remove token and user in localStorage", () => {
    expect.assertions(2);

    reducers.logout();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, "pollAppAuth");
  });
});
