import React, { Component } from "react";
import SliderTemplate from "./SliderTemplate";

class Slider extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    fetch(`http://localhost:3004/articles?_start=0&_end=3`)
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
    return <SliderTemplate type="featured" data={this.state.news} />;
  }
}

export default Slider;
