import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./CardInfo.module.css";

const CardInfo = props => {
  const getTeamName = teams =>
    teams.filter(team => team.id == props.teamId).map(team => team.name)[0];

  return (
    <div className={styles.cardInfo}>
      <span className={styles.teamName}>{getTeamName(props.teams)}</span>
      <span className={styles.date}>
        <FontAwesome name="clock-o" />
        {props.date}
      </span>
    </div>
  );
};

export default CardInfo;
