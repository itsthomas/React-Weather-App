import React from "react";

const Form = props => {
  return (
    <form className="form-container" onSubmit={props.onGetWeather}>
      <div className="input-group mb-3">
        <input
          type="text"
          name="city"
          className="form-control"
          placeholder="Type a city name"
          aria-label="City"
          aria-describedby="basic-addon2"
        />
      </div>

      <div className="input-group-append">
        <button className="btn btn-warning" type="submit">
          Get Weather
        </button>
      </div>
    </form>
  );
};

export default Form;
