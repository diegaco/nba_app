import React from "react";
import TeamInfo from "../../Elements/TeamInfo";

const VideoHeader = props => {
  const renderTeamInfo = team => {
    return team ? <TeamInfo team={team} /> : null;
  };

  return <div>{renderTeamInfo(props.team)}</div>;
};

export default VideoHeader;
