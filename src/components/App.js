import React, { Component } from "react";
import Title from "./Title/Title";
import Weather from "./Weather";

import "../App.scss";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-12 left">
            <Title />
          </div>

          <div className="col-lg-6 col-12 right">
            <Weather />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
