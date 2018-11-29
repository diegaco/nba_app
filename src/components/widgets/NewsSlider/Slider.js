import React, { Component } from "react";
import SliderTemplate from "./SliderTemplate";
import { API_URL } from "../../../config";

class Slider extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    fetch(
      `${API_URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          news: data
        });
      })
      .catch(error => {
        throw new Error(
          "Hubo un problema con la petición Fetch:" + error.message
        );
      });
  }

  render() {
    return (
      <SliderTemplate
        type={this.props.type}
        data={this.state.news}
        settings={this.props.settings}
      />
    );
  }
}

export default Slider;
