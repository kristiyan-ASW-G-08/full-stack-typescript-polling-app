import React, { FC, lazy, Suspense } from "react";
import { Route, Switch, useLocation, useHistory, Link } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));

const AuthApp: FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default AuthApp;
