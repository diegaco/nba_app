import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./NewsList.module.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";
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

  componentDidMount() {
    this.requestData(this.state.start, this.state.end);
  }

  requestData = (start, end) => {
    if (this.state.teams.length < 1) {
      fetch(`${API_URL}/teams?`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({
            teams: data
          });
        });
    }

    fetch(`${API_URL}/articles?_start=${start}&_end=${end}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          articles: [...this.state.articles, ...data],
          start,
          end
        });
      });
  };

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
      default:
        template = null;
        break;
    }
    return template;
  };

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.requestData(this.state.end, end);
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
