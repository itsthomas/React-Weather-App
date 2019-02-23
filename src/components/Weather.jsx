import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import Alert from "./Alert";

class Weather extends Component {
  state = {
    api_key: null,
    country: "",
    city: "",
    currentTemp: "",
    maxTemp: "",
    minTemp: "",
    humidity: "",
    description: "",
    icon: "",
    error: ""
  };

  addApiKey = api_key => {
    this.setState({
      api_key: api_key
    });
  };

  getWeather = async (e, api_key) => {
    console.log("API Key form state: ", this.state.api_key);
    e.preventDefault();

    const URL = "https://api.openweathermap.org/data/2.5/weather?q=";

    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
      ? process.env.REACT_APP_OPENWEATHERMAP_API_KEY
      : this.state.api_key;

    let city = e.target.elements.city.value;
    try {
      if (city) {
        city = city.split(" ").join("+");
        const response = await axios.get(
          `${URL}${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response;
        console.log(data);
        this.setState({
          country: data.data.sys.country,
          city: data.data.name,
          currentTemp: data.data.main.temp,
          maxTemp: data.data.main.temp_max,
          minTemp: data.data.main.temp_min,
          humidity: data.data.main.humidity,
          description: data.data.weather[0].description,
          icon: data.data.weather[0].icon,
          error: ""
        });
      } else {
        this.setState({
          error: "Please enter a city name"
        });
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        this.setState({ error: err.response.data.message });

        console.log(`Error Response status is:  ${err.response.status}`);
      }
    }
  };

  render() {
    // console.log(`Error in state is updated to ${this.state.error}`);
    let showResult = "";
    if (this.state.error === "" && this.state.city) {
      showResult = (
        <ul className="weather-result">
          <li>
            <span className="list-title">Location: </span>
            {this.state.country} {this.state.city}
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
              alt={this.state.description}
            />
          </li>
          <li>
            <span className="list-title">Current Temperature: </span>
            {Math.round(this.state.currentTemp)}° Celsius
          </li>
          <li>
            <span className="list-title">Max Temperature: </span>
            {this.state.maxTemp}° Celsius
          </li>
          <li>
            <span className="list-title">Min Temperature: </span>
            {this.state.minTemp}° Celsius
          </li>
          <li>
            <span className="list-title">Humidity: </span>
            {this.state.humidity}
          </li>
          <li>
            <span className="list-title">Description: </span>
            {this.state.description}
          </li>
        </ul>
      );
    }
    if (this.state.error !== "") {
      showResult = (
        <div className="error">
          <span className="error-text">Error: {this.state.error}</span>
        </div>
      );
    }

    return (
      <>
        <Form onGetWeather={this.getWeather} />
        <Alert
          api_key={api_key => this.state.api_key(api_key)}
          passApiKey={api_key => this.addApiKey(api_key)}
        />
        {showResult}
      </>
    );
  }
}

export default Weather;
