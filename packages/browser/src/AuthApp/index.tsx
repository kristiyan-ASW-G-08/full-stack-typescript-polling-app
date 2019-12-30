import React, { FC, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AuthNavbar from "components/AuthNavbar";

const Home = lazy(() => import("pages/Home"));
const PollForm = lazy(() => import("pages/PollForm"));

const AuthApp: FC = () => {
  return (
    <>
      <AuthNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/poll"
          render={(): JSX.Element => (
            <Suspense fallback={<div>loading...</div>}>
              <PollForm />
            </Suspense>
          )}
        />
      </Switch>
    </>
  );
};

export default AuthApp;
