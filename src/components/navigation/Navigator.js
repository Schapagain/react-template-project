import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import Landing from "../Landing";
import Login from "../auth/Login";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../auth/Signup";
import Sidebar from "./Sidebar";
import About from "../About";
import MobileNav from "./MobileNav";
import CollectionHome from "../../pages/collection/Home";

export default function Navigator() {
  const classes =
    "flex mx-auto w-full max-w-screen-xl justify-between overflow-hidden flex-col h-full bg-page ";
  return (
    <div className={classes}>
      <Route path="/" component={Navbar} />
      <Route path="/" component={MobileNav} />
      <Route path="/" component={Sidebar} />
      <div className="p-20 w-full">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/collection/:id" component={CollectionHome} />
        </Switch>
      </div>
    </div>
  );
}
