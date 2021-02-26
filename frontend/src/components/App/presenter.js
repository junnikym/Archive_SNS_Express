import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import Auth from "../Auth";
import Navigation from "../Navigation";  
import Footer from "../Footer";

import Home from "../Home_";
import Profile from "../Profile";

import GroupHome from "../GroupHome";

const App = props => [
  props.isLoggedIn ? <PrivateRoutes key={1} /> : <PublicRoutes key={1} />,
  // props.isLoggedIn ? <PrivateRoutes key={1} /> : <PrivateRoutes key={1} />,
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoutes = props => (

  <Route>
    
      <Navigation />
      <Switch>
            {/* Profiles */}
            <Route exact path ="/Profile/:pk" component = {Profile} />

            {/* groupHome */}
            <Route exact path = "/GroupHome" component = {GroupHome} />

            {/* Post */}
            <Route exact path = "/" component = {Home} />
      </Switch>
      <Footer/>

  </Route>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

export default App;
