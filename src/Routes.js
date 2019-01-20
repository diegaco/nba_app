import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/Layout";
import Post from "./components/Articles/News/Post";
import News from "./components/Articles/News/NewsMain";
import Video from "./components/Articles/Videos/Video";
import VideosMain from "./components/Articles/Videos/VideosMain";
import SignIn from "./components/SignIn/";

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exact component={Post} />
          <Route path="/videos/:id" exact component={Video} />
          <Route path="/news" exact component={News} />
          <Route path="/videos" exact component={VideosMain} />
          <Route path="/sign-in" exact component={SignIn} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
