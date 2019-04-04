import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegisterUser from "./RegisterUser";
import LoginForm from "./LoginForm";

function Index() {
  return <h2>Home</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/login" component={LoginForm} />
      </div>
    </Router>
  );
}

export default AppRouter;
