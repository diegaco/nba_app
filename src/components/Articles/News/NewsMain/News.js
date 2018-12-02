import React from "react";
import NewsSlider from "../../../widgets/NewsSlider";
import NewsList from "../../../widgets/NewsList";

const News = () => {
  return (
    <div>
      <NewsSlider
        type="featured"
        start="0"
        amount="3"
        settings={{ dots: false }}
      />
      <NewsList type="cardImage" loadmore={true} start={3} amount={7} />
    </div>
  );
};

export default News;
