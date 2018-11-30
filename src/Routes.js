import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/Layout";
import Post from "./components/Articles/News/Post";
import Video from "./components/Articles/Videos/Video/Video";

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exact component={Post} />
          <Route path="/videos/:id" exact component={Video} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
