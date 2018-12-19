import React, { Component } from "react";
import SliderTemplate from "./SliderTemplate";
import { firebaseLooper, firebaseArticles } from "../../../firebase";

class Slider extends Component {
  state = {
    news: []
  };

  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    firebaseArticles
      .limitToFirst(3)
      .once("value")
      .then(snapshot => {
        const news = firebaseLooper(snapshot);
        if (this._isMounted) {
          this.setState({
            news
          });
        }
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
