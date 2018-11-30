import React, { Component } from "react";
import Button from "../Button";
import styles from "./VideosList.module.css";
import { API_URL } from "../../../config";
import VideoTemplate from "./VideoTemplate";

class VideosList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  };

  requestData = (start, end) => {
    if (this.state.teams.length < 1) {
      fetch(`${API_URL}/teams`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            teams: data
          });
        });
    }

    fetch(`${API_URL}/videos?_start=${start}&_end=${end}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          videos: [...this.state.videos, ...data],
          start,
          end
        });
      });
  };

  componentDidMount() {
    this.requestData(this.state.start, this.state.end);
  }

  renderTitle = () =>
    this.props.title ? (
      <h3>
        <strong>NBA</strong> Videos
      </h3>
    ) : (
      ""
    );

  renderVideos = () => {
    let template = null;
    switch (this.props.type) {
      case "card":
        template = (
          <VideoTemplate data={this.state.videos} teams={this.state.teams} />
        );
        break;
      default:
        template = null;
        break;
    }
    return template;
  };

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.requestData(this.state.end, end);
  };

  renderButton = () =>
    this.props.loadmore ? (
      <Button type="loadmore" loadMore={this.loadMore} cta="Load More Videos" />
    ) : (
      <Button type="linkTo" cta="More Videos" linkTo="/videos/" />
    );

  render() {
    return (
      <div className={styles.videoListWrapper}>
        {this.renderTitle()}
        {this.renderVideos()}
        {this.renderButton()}
      </div>
    );
  }
}

export default VideosList;
