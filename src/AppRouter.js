import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Components/Users/Login";
import RegisterUser from "./Components/Users/RegisterUser";
import ConfirmUser from "./Components/Users/ConfirmUser";
import ResetPassword from "./Components/Users/ResetPassword";

function Index() {
  return <h2>Home</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/users/register" component={RegisterUser} />
        <Route path="/users/confirmEmail" component={ConfirmUser} />
        <Route path="/users/login" component={Login} />
        <Route path="/users/resetPassword" component={ResetPassword} />
      </div>
    </Router>
  );
}

export default AppRouter;
