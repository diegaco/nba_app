import React from "react";
import styles from "../VideosList.module.css";
import VideoTemplate from "../VideoTemplate";

const VideosRelated = props => {
  return (
    <div className={styles.videoRelatedWrapper}>
      <VideoTemplate data={props.data} teams={props.teams} />
    </div>
  );
};

export default VideosRelated;
