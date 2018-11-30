import React, { Component } from "react";
import ArticleHeader from "./ArticleHeader";
import { API_URL } from "../../../../config";
import styles from "../../Articles.module.css";

class Post extends Component {
  state = {
    article: [],
    team: []
  };

  componentDidMount() {
    fetch(`${API_URL}/articles?id=${this.props.match.params.id}`)
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
    const { article } = this.state;
    const { team } = this.state;

    return (
      <div className={styles.articleWrapper}>
        <ArticleHeader
          team={team[0]}
          date={article.date}
          author={article.author}
        />
        <div className={styles.articleContent}>
          <h1>{article.title}</h1>
          <div
            className={styles.articleImage}
            style={{
              backgroundImage: `url('/images/articles/${article.image}')`
            }}
          />
          <div className={styles.articleText}>{article.body}</div>
        </div>
      </div>
    );
  }
}

export default Post;
