import React, { FC, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "components/Navbar";

const Home = lazy(() => import("pages/Home"));

const UnAuthApp: FC = () => {
  return (
    <>
      <Navbar links={[{ path: "/", content: "Home" }]} />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default UnAuthApp;
