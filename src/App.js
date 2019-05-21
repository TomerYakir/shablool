import React, { Component} from "react";

import Login from "./Components/Users/Login"
import "./App.css";

class App extends Component{


  render(){
    const loggedIn = false;
    if (!loggedIn) {
      return (
        <Login/>
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
