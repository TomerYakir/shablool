import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegisterUser from "./RegisterUser";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/register" component={RegisterUser} />
      </div>
    </Router>
  );
}

export default AppRouter;
