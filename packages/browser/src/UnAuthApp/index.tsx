import React, { FC, lazy, Suspense } from "react";
import { Route, Switch, useLocation, useHistory, Link } from "react-router-dom";
import Navbar from "components/Navbar";

const Home = lazy(() => import("pages/Home"));

const UnAuthApp: FC = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default UnAuthApp;
