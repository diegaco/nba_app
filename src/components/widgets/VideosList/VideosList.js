import React, { Component } from "react";
import Button from "../Button";
import styles from "./VideosList.module.css";
import {
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
} from "../../../firebase";
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
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLooper(snapshot);
        this.setState({
          teams
        });
      });
    }

    firebaseVideos
      .orderByChild("id")
      .startAt(start)
      .endAt(end)
      .once("value")
      .then(snapshot => {
        const videos = firebaseLooper(snapshot);
        this.setState({
          videos: [...this.state.videos, ...videos],
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
    this.requestData(this.state.end + 1, end);
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
