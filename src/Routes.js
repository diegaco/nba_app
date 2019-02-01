import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/Layout";
import Post from "./components/Articles/News/Post";
import News from "./components/Articles/News/NewsMain";
import Video from "./components/Articles/Videos/Video";
import VideosMain from "./components/Articles/Videos/VideosMain";
import SignIn from "./components/SignIn/";
import Dashboard from "./components/Dashboard";

const Routes = props => {
  return (
    <Layout user={props.user}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/articles/:id" exact component={Post} />
        <Route path="/videos/:id" exact component={Video} />
        <Route path="/news" exact component={News} />
        <Route path="/videos" exact component={VideosMain} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Layout>
  );
};

export default Routes;
