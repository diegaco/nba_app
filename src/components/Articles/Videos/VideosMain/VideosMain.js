import React from "react";
import VideosList from "../../../widgets/VideosList";

const Videos = () => {
  return (
    <div>
      <VideosList
        type="card"
        title={false}
        loadmore={true}
        start={0}
        amount={7}
      />
    </div>
  );
};

export default Videos;
