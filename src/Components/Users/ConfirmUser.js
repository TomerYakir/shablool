import React, { Component} from "react";
import AlertMessage from "../Common/AlertMessage";

const {
    Stitch,
    RemoteMongoClient,
    UserPasswordAuthProviderClient,
    UserPasswordCredential
} = require('mongodb-stitch-browser-sdk');

class ConfirmUser extends Component {

  constructor(props) {
    super(props);
    this.state = {outcomeMsg: '',
                  outcomeType: ''
                };
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleResendConfirmation = this.handleResendConfirmation.bind(this);
  }

    reportSuccess(msg) {
      this.setState({outcomeMsg: msg, outcomeType: "success"});
    }

    reportError(msg, err) {
      this.setState({outcomeMsg: `${msg} ${err}`, outcomeType: "error"});
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

    handleConfirmation(token, tokenId) {
      const emailPassClient = this.getEmailPassClient();
      emailPassClient.confirmUser(token, tokenId).then(() => {
        this.reportSuccess("Successfully confirmed user!");
      })
      .catch(err => {
        this.reportError("Error confirming user:", err);
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
      if (this.state.outcomeType === "error") {
        return (
          <button type="button" onClick={this.handleResendConfirmation} className="btn btn-default btn-outline-primary">Resend Confirmation</button>
        )
      }
    }

    render(){
      const queryString = this.props.location.search;
      const params = new URLSearchParams(queryString);
      const token = params.get('token');
      const tokenId = params.get('tokenId');
      if (this.state.outcomeType === "") {
        this.handleConfirmation(token, tokenId);
      }
      if (this.state.outcomeType === "success") {
        return (
          <div>
            <h3>User successfully confirmed!</h3>
          </div>
        )
      }
      return(
        <div>
          <h3>Registration Confirmation</h3>
          {this.renderResend()}
          <AlertMessage result={this.state.outcomeType} msg={this.state.outcomeMsg} />
        </div>
      );
    }
  }

  export default ConfirmUser;
