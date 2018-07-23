import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import Header from '../pages/Header';
export default () => (
  <Fragment>
    <Header />
    <Switch>
      <Route exact path="/welcome" component={Home} />
      <Route path="/items" component={Items} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:userId" component={Profile} />
      <Route exact path="/share" component={Share} />
      <Redirect to="/items" />
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
    </Switch>
  </Fragment>
);
