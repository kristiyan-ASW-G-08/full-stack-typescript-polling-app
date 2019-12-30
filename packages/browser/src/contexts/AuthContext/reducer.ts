import AuthState from "types/AuthState";
import { defaultAuthState, Action } from ".";

export const logout = () => {
  localStorage.removeItem("pollAppAuth");
  return defaultAuthState;
};
export const login = (payload: AuthState) => {
  localStorage.setItem("pollAppAuth", JSON.stringify(payload));
  return payload;
};

export const reducers = {
  login,
  logout
};

const reducer = (state: AuthState, { type, payload }: Action) =>
  reducers[type](payload);

export default reducer;
