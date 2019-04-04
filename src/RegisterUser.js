import React, { Component} from "react";
import AlertMessage from "./components/AlertMessage";

const {
    Stitch,
    RemoteMongoClient,
    UserPasswordAuthProviderClient,
    UserPasswordCredential
} = require('mongodb-stitch-browser-sdk');

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', 
                  password: '',
                  outcomeMsg: '',
                  outcomeType: ''
                };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reportSuccess(msg) {
    this.setState({outcomeMsg: msg, outcomeType: "success"});
  }
  
  reportError(msg) {
    this.setState({outcomeMsg: msg, outcomeType: "error"});
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }
  
  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  resendConfirmation(emailPassClient) {
    emailPassClient.resendConfirmationEmail(this.state.email).then(() => {
       console.log("Successfully resent account confirmation email!");
    })
    .catch(err => {
       console.log("Error resending:", err);
    });
  }
  
  sendConfirmation(emailPassClient) {
    emailPassClient.registerWithEmail(this.state.email, this.state.password)
    .then(() => {
       this.reportSuccess("Successfully sent account confirmation email!");
    })
    .catch(err => {
      this.reportError("Error registering new user:", err);
    });
  }
  
  login(client) {
    const credential = new UserPasswordCredential(this.state.email, this.state.password);
    client.auth.loginWithCredential(credential)
  // Returns a promise that resolves to the authenticated user
  .then(authedUser => console.log(`successfully logged in with id: ${authedUser.id}`))
  .catch(err => console.error(`login failed with error: ${err}`))
  }

  sendResetPasswordEmail(emailPassClient) {
    emailPassClient.sendResetPasswordEmail(this.state.email).then(() => {
      console.log("Successfully sent password reset email!");
    }).catch(err => {
      console.log("Error sending password reset email:", err);
    });
  }

  resetPassword(emailPassClient, token, tokenId) {
    emailPassClient.resetPassword(token, tokenId, this.state.password).then(() => {
      console.log("Successfully reset password!");
    }).catch(err => {
      console.log("Error resetting password:", err);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var client;
    try {
      client = Stitch.getAppClient('shabloolgame-ooiog');
    } catch(e) {
      client = Stitch.initializeDefaultAppClient('shabloolgame-ooiog');
    }
    
    const emailPassClient = client.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
    this.sendConfirmation(emailPassClient);
    
  }

  render(){
    return(
      <div>
        <h3>Hi there! Please fill in your details below to register:</h3>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
              <button type="submit" className="btn btn-default btn-outline-primary">Submit</button>
            </div>
          </div>
        </form>
        <AlertMessage result={this.state.outcomeType} msg={this.state.outcomeMsg} />
      </div>
    );
  }
}

export default RegisterUser;
