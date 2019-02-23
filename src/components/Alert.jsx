import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

// Creating custom dialog alerts using React-Bootstrap-Sweetalert
// http://djorg83.github.io/react-bootstrap-sweetalert/

class Alert extends Component {
  state = {
    alert: null // initialising an empty alert
  };

  // Defining first alert
  showAlert() {
    const getAlert = e => (
      <SweetAlert
        input
        showCancel
        confirmBtnText="Confirm"
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="info"
        placeholder="Type your API Key"
        customClass="sweetalert"
        title="Please add your YouTube API-Key"
        onConfirm={e => this.addAPIKey(e)}
        onCancel={() => this.closeAlert()}
      >
        For this site to work, you need an API Key
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  addAPIKey(api_key) {
    // console.log(api_key);
    this.setState({
      alert: null // This will colse the dialog window
    });

    // console.log(`Am I here: `, api_key);
    this.props.passApiKey(api_key);
  }

  closeAlert() {
    this.setState({
      alert: null // This will colse the dialog window
    });
  }

  componentDidMount() {
    this.showAlert();
  }

  render() {
    return <>{this.state.alert}</>;
  }
}

export default Alert;
