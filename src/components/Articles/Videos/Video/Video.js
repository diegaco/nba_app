import React, { Component } from "react";
import { API_URL } from "../../../../config";
import ArticleHeader from "../../News/Post/ArticleHeader";
// import styles from "../../Articles.module.css";

class Video extends Component {
  state = {
    article: [],
    team: []
  };

  componentDidMount() {
    fetch(`${API_URL}/videos?_id=${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        let article = data[0];

        fetch(`${API_URL}/teams?id=${article.team}`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              article,
              team: data
            });
          });
      });
  }

  render() {
    // const { article } = this.state;
    const { team } = this.state;
    return (
      <div>
        <ArticleHeader team={team[0]} />
        <strong>hhah</strong>
      </div>
    );
  }
}

export default Video;
