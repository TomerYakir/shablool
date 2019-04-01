import React, { Component} from "react";

class LoginForm extends Component{

  render(){
    return(
      <div>
        <h3>Hi there! Please enter your details below to login:</h3>
        <form className="form-horizontal" action="/action_page.php">
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="email">Email:</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default btn-outline-primary">Submit</button>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

export default LoginForm;
