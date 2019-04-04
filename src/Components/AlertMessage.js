import React, { Component} from "react";

export default class AlertMessage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    $(".alert-dismissible").fadeTo(2000,500).slideUp(500, function() { $(".alert-dismissible").slideUp(500) } );
  }

  render(){
    const { result, msg } = this.props;
    let alertClass = "alert-success";
    if (result === "error") alertClass = "alert-warning";
    if (msg == "") {
      return (<div />)
    } else {
      return(
        <div id="alert-dismissible" className={`alert ${alertClass} alert-dismissible fade show`} role="alert">
          {msg}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  }

}
