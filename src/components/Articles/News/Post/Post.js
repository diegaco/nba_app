import React, { Component } from "react";
import ArticleHeader from "./ArticleHeader";
import {
  firebaseDB,
  firebaseTeams,
  firebaseLooper
} from "../../../../firebase";
import styles from "../../Articles.module.css";

class Post extends Component {
  state = {
    article: [],
    team: []
  };

  componentDidMount() {
    firebaseDB
      .ref(`articles/${this.props.match.params.id}`)
      .once("value")
      .then(snapshot => {
        let article = snapshot.val();

        firebaseTeams
          .orderByChild("teamId")
          .equalTo(article.team)
          .once("value")
          .then(snapshot => {
            let team = firebaseLooper(snapshot);

            this.setState({
              article,
              team
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
