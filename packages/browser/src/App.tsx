import React, { FC, lazy, Suspense, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "styles/tailwind.css";
const AuthApp = lazy(() => import("AuthApp"));
const UnAuthApp = lazy(() => import("UnAuthApp"));

const App: FC = () => {
  const { authState } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading</p>}>
        {authState?.user ? <AuthApp /> : <UnAuthApp />}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
