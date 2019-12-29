import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthContextProvider } from "contexts/AuthContext";

const rootEl = document.getElementById("root");
// @ts-ignore
const root = ReactDOM.createRoot(rootEl);
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();