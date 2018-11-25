import React from "react";
import { Link } from "react-router-dom";
import Slick from "react-slick";
import styles from "./Slider.module.css";

const SliderTemplate = props => {
  let template = null;

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  switch (props.type) {
    case "featured":
      template = props.data.map(item => (
        <div key={item.id}>
          <div className={styles.featuredItem}>
            <div
              className={styles.featuredImage}
              style={{
                backgroundImage: `url(../images/articles/${item.image})`
              }}
            />
            <Link to={`/artciles/${item.id}`}>
              <h3 className={styles.featuredCaption}>{item.title}</h3>
            </Link>
          </div>
        </div>
      ));
      break;
    default:
      template = null;
  }

  return <Slick {...settings}>{template}</Slick>;
};

export default SliderTemplate;
