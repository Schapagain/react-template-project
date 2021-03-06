import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import Landing from "../pages/home/Landing";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";
import About from "../pages/about/Home";
import MobileNav from "./MobileNav";
import AlbumHome from "../pages/albums/Home";
import AlbumImages from "../pages/albums/Images";

import NotFound from "../components/misc/NotFound";

export default function Navigator() {
  const classes =
    "flex mx-auto w-full max-w-screen-xl justify-between flex-col h-full bg-page ";
  return (
    <div className={classes}>
      <Route path="/" component={Navbar} />
      <Route path="/" component={MobileNav} />
      <Route path="/" component={Sidebar} />
      <div className="box-content h-full flex m-10 p-10">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/albums" component={AlbumHome} />
          <ProtectedRoute path="/album/:id" component={AlbumImages} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}
