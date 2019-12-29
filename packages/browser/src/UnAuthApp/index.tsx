import React, { FC, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import UnAuthNavbar from "components/UnAuthNavbar";

const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));

const UnAuthApp: FC = () => {
  return (
    <>
      <UnAuthNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          render={(): JSX.Element => (
            <Suspense fallback={<div>loading...</div>}>
              <Login />
            </Suspense>
          )}
        />
        <Route
          exact
          path="/signup"
          render={(): JSX.Element => (
            <Suspense fallback={<div>loading...</div>}>
              <SignUp />
            </Suspense>
          )}
        />
      </Switch>
    </>
  );
};

export default UnAuthApp;