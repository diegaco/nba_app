import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./CardInfo.module.css";
import moment from "moment";

const CardInfo = props => {
  const getTeamName = teams =>
    teams.filter(team => team.teamId == props.teamId).map(team => team.name)[0];

  const formatDate = date => {
    return moment(date).format(" MM-DD-YYYY");
  };

  return (
    <div className={styles.cardInfo}>
      <span className={styles.teamName}>{getTeamName(props.teams)}</span>
      <span className={styles.date}>
        <FontAwesome name="clock-o" />
        {formatDate(props.date)}
      </span>
    </div>
  );
};

export default CardInfo;
