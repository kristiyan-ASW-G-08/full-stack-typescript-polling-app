import React, { FC, lazy, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthNavbar from "components/AuthNavbar";
import Loader from "components/Loader";
import Notification from "components/Notification";
import { NotificationContext } from "contexts/NotificationContext";

const Home = lazy(() => import("pages/Home"));
const PollForm = lazy(() => import("pages/PollForm"));
const PollPage = lazy(() => import("pages/PollPage"));
const PollResults = lazy(() => import("pages/PollResults"));
const Polls = lazy(() => import("pages/Polls"));
const NotFound = lazy(() => import("pages/NotFound"));

const AuthApp: FC = () => {
  const { notificationState } = useContext(NotificationContext);
  return (
    <>
      <AuthNavbar />
      {notificationState?.isActive ? (
        <Notification
          type={notificationState.type}
          content={notificationState.content}
        />
      ) : (
        ""
      )}
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
          path="/polls/:pollId/results"
          render={(): JSX.Element => (
            <Suspense fallback={<Loader />}>
              <PollResults />
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
