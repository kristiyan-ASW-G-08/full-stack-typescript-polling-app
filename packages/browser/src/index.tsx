import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import { AuthContextProvider } from "contexts/AuthContext";
import { NotificationContextProvider } from "contexts/NotificationContext";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootEl = document.getElementById("root");
ReactDOM.render(
  <NotificationContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </NotificationContextProvider>,
  rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
