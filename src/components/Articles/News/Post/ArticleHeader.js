import React from "react";
import TeamInfo from "../../Elements/TeamInfo";
import PostData from "../../Elements/PostData";

const ArticleHeader = props => {
  const renderTeamInfo = team => {
    return team ? <TeamInfo team={team} /> : null;
  };

  const postData = (date, author) => <PostData data={{ date, author }} />;

  return (
    <div>
      {renderTeamInfo(props.team)}
      {postData(props.date, props.author)}
    </div>
  );
};

export default ArticleHeader;
