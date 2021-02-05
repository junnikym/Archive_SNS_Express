import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import Auth from "../Auth";

import Navigation from "../Navigation";        
import User_list from "../User_list"    
import Footer from "../Footer";    

import Own_Profile from "../Profile_/Own";

import Post from "../Post/container";

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
    <User_list/>

      <Switch>
            {/* Profiles */}
            <Route exact path ="/Own_Profile" component = {Own_Profile} />

            {/* Post */}
            <Route exact path ="/" component = {Post} />
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
