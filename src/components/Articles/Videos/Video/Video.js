import React, { Component } from "react";
import {
  firebaseDB,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
} from "../../../../firebase";
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
    firebaseDB
      .ref(`videos/${this.props.match.params.id}`)
      .once("value")
      .then(snapshot => {
        let articleVideo = snapshot.val();

        firebaseTeams
          .orderByChild("teamId")
          .equalTo(articleVideo.team)
          .once("value")
          .then(snapshot => {
            let team = firebaseLooper(snapshot);

            this.setState({
              articleVideo,
              team
            });
            this.getRelated();
          });
      });
  }

  getRelated = () => {
    firebaseTeams.once("value").then(snapshot => {
      const teams = firebaseLooper(snapshot);

      firebaseVideos
        .orderByChild("team")
        .equalTo(this.state.articleVideo.team)
        .limitToFirst(3)
        .once("value")
        .then(snapshot => {
          const related = firebaseLooper(snapshot);
          this.setState({
            teams,
            related
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
