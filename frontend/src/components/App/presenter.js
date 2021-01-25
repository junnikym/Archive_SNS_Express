import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import Auth from "../Auth";

import Home_ from "./Home_";

const App = props => [
  props.isLoggedIn ? <PrivateRoutes key={1} /> : <PublicRoutes key={1} />,
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoutes = props => (
  <Route>
      <Home_/>
  </Route>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

export default App;
