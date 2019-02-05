import React, { Component } from "react";
import SliderTemplate from "./SliderTemplate";
import { firebase, firebaseLooper, firebaseArticles } from "../../../firebase";

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

        const asyncFunction = (item, i, callback) => {
          firebase
            .storage()
            .ref("images")
            .child(item.image)
            .getDownloadURL()
            .then(url => {
              news[i].image = url;
              callback();
            });
        };

        let requests = news.map((item, i) => {
          return new Promise(resolve => {
            asyncFunction(item, i, resolve);
          });
        });

        Promise.all(requests).then(() => {
          if (this._isMounted) {
            this.setState({
              news
            });
          }
        });
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
