import React, { Component} from "react";
import AlertMessage from "../Common/AlertMessage";

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
    this.handleResendConfirmation = this.handleResendConfirmation.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const emailPassClient = this.getEmailPassClient();
    emailPassClient.registerWithEmail(this.state.email, this.state.password)
    .then(() => {
       this.reportSuccess("Successfully sent account confirmation email!");
    })
    .catch(err => {
      this.reportError("Error registering new user:", err);
    });
    
  }
  
  handleResendConfirmation() {
    const emailPassClient = this.getEmailPassClient();
    emailPassClient.resendConfirmationEmail(this.state.email).then(() => {
      this.reportSuccess("Successfully resent account confirmation email!");
    })
    .catch(err => {
      this.reportError("Error resending confirmation:", err);
    });
  }

  renderResend() {
    if (this.state.outcomeType === "success") {
      return (
        <button type="button" onClick={this.handleResendConfirmation} className="btn btn-default btn-outline-primary">Resend Confirmation</button>
      )  
    }
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
              <div>
                <button type="submit" className="btn btn-default btn-outline-primary">Submit</button>
              </div>
              <div>
                {this.renderResend()}
              </div>
            </div>
          </div>
        </form>
        <AlertMessage result={this.state.outcomeType} msg={this.state.outcomeMsg} />
      </div>
    );
  }
}

export default RegisterUser;
