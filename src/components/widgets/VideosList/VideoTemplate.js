import React from "react";
import styles from "./VideosList.module.css";
import { Link } from "react-router-dom";
import CardInfo from "../CardInfo/";

const VideoTemplate = props => {
  return props.data.map(video => (
    <Link to={`/videos/${video.id}`} key={video.id}>
      <div className={styles.videoListItemWrapper}>
        <div
          className={styles.videoListItemImage}
          style={{ backgroundImage: `url(/images/videos/${video.image})` }}
        >
          <div />
        </div>
        <div className={styles.videoListItemContent}>
          <CardInfo teams={props.teams} teamId={video.team} date={video.date} />
          <h2>{video.title}</h2>
        </div>
      </div>
    </Link>
  ));
};

export default VideoTemplate;
