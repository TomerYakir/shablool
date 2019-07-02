import React, { Component} from "react";

import Login from "./Components/Users/Login";
import GameSelecter from "./Components/Games/GameSelecter";

import "./App.css";

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      authUser: null
    }
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(authUser) {
    this.setState({
      loggedIn: true,
      authUser: authUser
    });
  }

  render() {
    const { loggedIn, authUser } = this.state;
    // TODO - change
    if (loggedIn) {
      return (
        <Login onLogin={this.onLogin} />
      );
    } else {
      return(
        <div className="App">
          <h1> Shablool Game! </h1>
          <small>Logged in as: {authUser ? authUser.id : "null"} </small>
          <GameSelecter />
        </div>
      );
    }
  }
}

export default App;
