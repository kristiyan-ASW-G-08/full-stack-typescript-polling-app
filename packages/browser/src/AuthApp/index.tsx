import React, { FC, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AuthNavbar from "components/AuthNavbar";
import Loader from "components/Loader";

const Home = lazy(() => import("pages/Home"));
const PollForm = lazy(() => import("pages/PollForm"));
const PollPage = lazy(() => import("pages/PollForm"));
const Polls = lazy(() => import("pages/Polls"));
const NotFound = lazy(() => import("pages/NotFound"));

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
            <Suspense fallback={<Loader />}>
              <PollForm />
            </Suspense>
          )}
        />
        <Route
          exact
          path="/polls/:pollId"
          render={(): JSX.Element => (
            <Suspense fallback={<Loader />}>
              <PollPage />
            </Suspense>
          )}
        />
        <Route
          exact
          path="/polls"
          render={(): JSX.Element => (
            <Suspense fallback={<Loader />}>
              <Polls />
            </Suspense>
          )}
        />
        <Route
          exact
          render={(): JSX.Element => (
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          )}
        />
      </Switch>
    </>
  );
};

export default AuthApp;
