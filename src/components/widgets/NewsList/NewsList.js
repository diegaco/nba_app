import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./NewsList.module.css";
import { Link } from "react-router-dom";
import {
  firebase,
  firebaseArticles,
  firebaseTeams,
  firebaseLooper
} from "../../../firebase";
import Button from "../Button/";
import CardInfo from "../CardInfo/";

class NewsList extends Component {
  state = {
    articles: [],
    teams: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.requestData(this.state.start, this.state.end);
  }

  requestData = (start, end) => {
    if (this.state.teams.length < 1) {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLooper(snapshot);
        if (this._isMounted) {
          this.setState({
            teams
          });
        }
      });
    }

    firebaseArticles
      .orderByChild("id")
      .startAt(start)
      .endAt(end)
      .once("value")
      .then(snapshot => {
        const articles = firebaseLooper(snapshot);

        const asyncFunction = (item, i, cb) => {
          firebase
            .storage()
            .ref("images")
            .child(item.image)
            .getDownloadURL()
            .then(url => {
              articles[i].image = url;
              cb();
            });
        };

        let requests = articles.map((item, i) => {
          return new Promise(resolve => {
            asyncFunction(item, i, resolve);
          });
        });

        Promise.all(requests).then(() => {
          if (this._isMounted) {
            this.setState({
              articles: [...this.state.articles, ...articles]
            });
          }
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderNews = type => {
    let template = "";

    switch (type) {
      case "card":
        template = this.state.articles.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsListWrapper,
              enterActive: styles.newsListWrapperEnter
            }}
            timeout={500}
            key={i}
          >
            <article key={item.id}>
              <div className={styles.newsListItem}>
                <Link to={`/articles/${item.id}`}>
                  <CardInfo
                    teams={this.state.teams}
                    teamId={item.team}
                    date={item.date}
                  />
                  <h2 className={styles.newsListItemTitle}>{item.title}</h2>
                </Link>
              </div>
            </article>
          </CSSTransition>
        ));
        break;
      case "cardImage":
        template = this.state.articles.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsListWrapper,
              enterActive: styles.newsListWrapperEnter
            }}
            timeout={500}
            key={i}
          >
            <article key={item.id}>
              <div
                className={`${styles.newsListItem} ${
                  styles.newsListItemWithImage
                } `}
              >
                <Link to={`/articles/${item.id}`}>
                  <div className={styles.newsListItemWrapper}>
                    <div
                      className={styles.newsListItemImage}
                      style={{
                        backgroundImage: `url(${item.image})`
                      }}
                    />
                    <div className={styles.newsListItemContent}>
                      <CardInfo
                        teams={this.state.teams}
                        teamId={item.team}
                        date={item.date}
                      />
                      <h2 className={styles.newsListItemTitle}>{item.title}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            </article>
          </CSSTransition>
        ));
        break;
      default:
        template = null;
        break;
    }
    return template;
  };

  loadMore = () => {
    let end = Number(this.state.end) + Number(this.state.amount);
    this.requestData(this.state.end + 1, end);
  };

  render() {
    return (
      <div>
        <TransitionGroup component="div" className="list">
          {this.renderNews(this.props.type)}
        </TransitionGroup>
        <Button type="loadmore" loadMore={this.loadMore} cta="Load More News" />
      </div>
    );
  }
}

export default NewsList;
