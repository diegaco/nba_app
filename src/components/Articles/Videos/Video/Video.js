import React, { Component } from "react";
import { API_URL } from "../../../../config";
import VideoHeader from "./VideoHeader";
import VideosRelated from "../../../widgets/VideosList/VideosRelated/";
import styles from "../../Articles.module.css";

class Video extends Component {
  state = {
    articleVideo: [],
    team: [],
    teams: [],
    related: []
  };

  componentDidMount() {
    fetch(`${API_URL}/videos?id=${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        let articleVideo = data[0];

        fetch(`${API_URL}/teams?id=${articleVideo.team}`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              articleVideo,
              team: data
            });
            this.getRelated();
          });
      });
  }

  getRelated = () => {
    fetch(`${API_URL}/teams`)
      .then(res => res.json())
      .then(data => {
        let teams = data;
        fetch(`${API_URL}/videos?q=${this.state.team[0].city}&_limit=3`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              teams,
              related: data
            });
          });
      });
  };

  render() {
    const { articleVideo } = this.state;
    const { team } = this.state;
    return (
      <div>
        <VideoHeader team={team[0]} />
        <div className={styles.videoWrapper}>
          <h1>{articleVideo.title}</h1>
          <iframe
            title="VideoPlayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${articleVideo.url}`}
            frameBorder="0"
          />
        </div>
        <VideosRelated data={this.state.related} teams={this.state.teams} />
      </div>
    );
  }
}

export default Video;
