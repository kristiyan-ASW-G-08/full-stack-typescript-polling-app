import AuthState from "types/AuthState";
import { defaultAuthState, Action } from ".";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return defaultAuthState;
};
export const login = (payload: AuthState) => {
  localStorage.setItem("token", JSON.stringify(payload.token));
  localStorage.setItem("user", JSON.stringify(payload.user));
  return payload;
};

export const reducers = {
  login,
  logout
};

const reducer = (state: AuthState, { type, payload }: Action) =>
  reducers[type](payload);

export default reducer;
