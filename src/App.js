import React, { Component} from "react";

import LoginForm from "./LoginForm"
import "./App.css";

class App extends Component{


  render(){
    const loggedIn = false;
    if (!loggedIn) {
      return (
        <LoginForm/>
      );
    } else {
      return(
        <div className="App">
          <h1> Hello, World! </h1>
        </div>
      );
    }
  }
}

export default App;
