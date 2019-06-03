import React, { Component} from "react";
import { Redirect } from "react-router-dom";
import AlertMessage from "../Common/AlertMessage";

const {
    Stitch,
    RemoteMongoClient,
    UserPasswordAuthProviderClient,
    UserPasswordCredential
} = require('mongodb-stitch-browser-sdk');

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: '',
                  outcomeMsg: '',
                  outcomeType: '',
                  redirectToResetPwd: false
                };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  reportSuccess(msg) {
    this.setState({outcomeMsg: msg, outcomeType: "success"});
  }

  reportError(msg, err) {
    this.setState({outcomeMsg: `${msg} ${err}`, outcomeType: "error"});
  }

  handleEmail(event) {
    this.setState({email: event.target.value, outcomeMsg: ""});
  }

  handlePassword(event) {
    this.setState({password: event.target.value, outcomeMsg: ""});
  }

  handleResetPassword() {
    const client = this.getClient();
    const emailPassClient = client.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
    emailPassClient.sendResetPasswordEmail(this.state.email).then(() => {
      this.reportSuccess("Successfully sent password reset email!");
    }).catch(err => {
      this.reportError("Error sending password reset email:", err);
    });
  }

  getClient() {
    var client;
    try {
      client = Stitch.getAppClient('shabloolgame-ooiog');
    } catch(e) {
      client = Stitch.initializeDefaultAppClient('shabloolgame-ooiog');
    }
    return client;
  }

  handleLogin(event) {
    event.preventDefault();
    const client = this.getClient();
    const credential = new UserPasswordCredential(this.state.email, this.state.password);
    client.auth.loginWithCredential(credential)
      .then(authedUser => {
        this.reportSuccess(`successfully logged in with id: ${authedUser.id}`);
        this.props.onLogin(authedUser);
      })
      .catch(err => {
        this.reportError(`login failed with error: ${err}`);
      });
  }

  renderResetPassword() {
    if (this.state.outcomeType === "error") {
      return (
        <button type="button" onClick={this.handleResetPassword} className="btn btn-default btn-outline-primary">Reset Password</button>
      )
    }
  }

  renderRedirect() {
    if (this.state.redirectToResetPwd) {
      return <Redirect to={{
        pathname: '/users/resetPasword',
        state: { email: this.state.email }
      }} />
    }
  }

  render(){
    return(
      <div>
        {this.renderRedirect()}
        <h3>Hi there! Please fill in your details below to login:</h3>
        <form className="form-horizontal" onSubmit={this.handleLogin}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmail} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={this.state.password} onChange={this.handlePassword} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div>
                <button type="submit" className="btn btn-default btn-outline-primary">Login</button>
              </div>
            </div>
          </div>
        </form>
        {this.renderResetPassword()}
        <AlertMessage result={this.state.outcomeType} msg={this.state.outcomeMsg} />
      </div>
    );
  }
}
