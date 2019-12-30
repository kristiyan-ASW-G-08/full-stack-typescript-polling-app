import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "contexts/AuthContext";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootEl = document.getElementById("root");
ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
