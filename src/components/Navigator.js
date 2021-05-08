import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import Login from "./Login";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./Signup";
import Sidebar from "./Sidebar";
import About from "./About";

export default function Navigator() {
  const classes =
    "flex mx-auto max-w-screen-xl justify-between overflow-hidden flex-col h-full bg-page ";
  return (
    <div className={classes}>
      <Route path="/" component={Navbar} />
      <Route path="/" component={Sidebar} />
      <div className="p-20">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <ProtectedRoute path="/home" component={Home} />
        </Switch>
      </div>
    </div>
  );
}
