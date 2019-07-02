import React, { Component} from "react";
import { Redirect } from "react-router-dom";
import AlertMessage from "../Common/AlertMessage";

const {
    Stitch,
    RemoteMongoClient,
    UserPasswordAuthProviderClient,
    UserPasswordCredential
} = require('mongodb-stitch-browser-sdk');

export default class ResetPassword extends Component {

  constructor(props) {
    super(props);
    const queryString = this.props.location.search;
    const params = new URLSearchParams(queryString);
    this.state = { password: '',
                  outcomeMsg: '',
                  outcomeType: '',
                  token: params.get("token"),
                  tokenId: params.get("tokenId"),
                  redirectToLogin: false
                };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleSuccessResetPassword = this.handleSuccessResetPassword.bind(this);
  }

  handleSuccessResetPassword() {
    this.setState({
      redirectToLogin: true
    })
  }

  reportSuccess(msg) {
    this.setState({outcomeMsg: msg, outcomeType: "success"});
  }

  reportError(msg, err) {
    this.setState({outcomeMsg: `${msg} ${err}`, outcomeType: "error"});
  }

  handlePassword(event) {
    this.setState({password: event.target.value, outcomeMsg: ""});
  }

  resetPassword(emailPassClient, token, tokenId) {
    emailPassClient.resetPassword(token, tokenId, this.state.password).then(() => {
      this.handleSuccessResetPassword();
    }).catch(err => {
      this.reportError("Error resetting password:", err);
    });
  }

  getEmailPassClient() {
    var client;
    try {
      client = Stitch.getAppClient('shabloolgame-ooiog');
    } catch(e) {
      client = Stitch.initializeDefaultAppClient('shabloolgame-ooiog');
    }
    const emailPassClient = client.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
    return emailPassClient;
  }

  handleResetPassword(event) {
    event.preventDefault();
    const emailPassClient = this.getEmailPassClient();
    this.resetPassword(emailPassClient, this.state.token, this.state.tokenId);
  }

  renderRedirect() {
    if (this.state.redirectToLogin) {
      return <Redirect to={{
        pathname: '/users/login',
        state: { email: this.state.email }
      }} />
    }
  }

  render(){
    return(
      <div>
        {this.renderRedirect()}
        <h3>Reset Password</h3>
        <form className="form-horizontal" onSubmit={this.handleResetPassword}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="pwd" placeholder="Enter new password" value={this.state.password} onChange={this.handlePassword} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div>
                <button type="submit" className="btn btn-default btn-outline-primary">Reset</button>
              </div>
            </div>
          </div>
        </form>
        <AlertMessage result={this.state.outcomeType} msg={this.state.outcomeMsg} />
      </div>
    );
  }
}
