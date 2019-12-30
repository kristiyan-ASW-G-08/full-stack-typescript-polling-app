import React, { FC, lazy, Suspense, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

import "./importFontAwesome";
import "styles/tailwind.css";

const AuthApp = lazy(() => import("AuthApp"));
const UnAuthApp = lazy(() => import("UnAuthApp"));

const App: FC = () => {
  const { authState, login } = useContext(AuthContext);
  const lsAuth = localStorage.getItem("pollAppAuth");
  if (lsAuth !== null && authState.user === undefined) {
    login(JSON.parse(lsAuth));
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading</p>}>
        {authState.user === undefined ? <UnAuthApp /> : <AuthApp />}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
