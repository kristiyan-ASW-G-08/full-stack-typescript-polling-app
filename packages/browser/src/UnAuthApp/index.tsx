import React, { FC, lazy, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import UnAuthNavbar from "components/UnAuthNavbar";
import Loader from "components/Loader";
import Notification from "components/Notification";
import { NotificationContext } from "contexts/NotificationContext";

const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const NotFound = lazy(() => import("pages/NotFound"));

const UnAuthApp: FC = () => {
  const { notificationState } = useContext(NotificationContext);
  return (
    <>
      <UnAuthNavbar />
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
          path="/login"
          render={(): JSX.Element => (
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          )}
        />
        <Route
          exact
          path="/signup"
          render={(): JSX.Element => (
            <Suspense fallback={<Loader />}>
              <SignUp />
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

export default UnAuthApp;
