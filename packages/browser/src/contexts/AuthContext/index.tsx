import React, { FC, createContext, useReducer, Dispatch } from "react";
import AuthState from "types/AuthState";
import reducer from "contexts/AuthContext/reducer";

export interface Action {
  type: "login" | "logout";
  payload: AuthState;
}
export const defaultAuthState: AuthState = {
  token: "",
  user: undefined
};
interface AuthContextProps {
  authState: AuthState;
  login: (payload: AuthState) => Dispatch<Action>;
  logout: (payload: AuthState) => Dispatch<Action>;
}
// @ts-ignore
export const AuthContext = createContext<AuthContextProps>({
  authState: defaultAuthState
});

export const AuthContextProvider: FC = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, defaultAuthState);
  const login = (payload: AuthState) => dispatch({ type: "login", payload });
  const logout = () => dispatch({ type: "logout", payload: defaultAuthState });
  return (
    <AuthContext.Provider value={{ authState, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
