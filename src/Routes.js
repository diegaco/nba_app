import React from "react";
import { Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/Layout";
import Post from "./components/Articles/News/Post";
import News from "./components/Articles/News/NewsMain";
import Video from "./components/Articles/Videos/Video";
import VideosMain from "./components/Articles/Videos/VideosMain";
import SignIn from "./components/SignIn/";
import Dashboard from "./components/Dashboard";
import PrivatesRoutes from "./components/AuthRoutes/PrivateRoutes";
import PublicRoutes from "./components/AuthRoutes/PublicRoutes";

const Routes = props => {
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoutes
          path="/"
          {...props}
          restricted={false}
          exact
          component={Home}
        />
        <PublicRoutes
          path="/news"
          {...props}
          restricted={false}
          exact
          component={News}
        />
        <PublicRoutes
          path="/articles/:id"
          {...props}
          restricted={false}
          exact
          component={Post}
        />
        <PublicRoutes
          path="/videos/:id"
          {...props}
          restricted={false}
          exact
          component={Video}
        />
        <PublicRoutes
          path="/videos"
          {...props}
          restricted={false}
          exact
          component={VideosMain}
        />
        <PublicRoutes
          path="/sign-in"
          {...props}
          restricted={true}
          exact
          component={SignIn}
        />
        <PrivatesRoutes
          path="/dashboard"
          exact
          component={Dashboard}
          {...props}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
