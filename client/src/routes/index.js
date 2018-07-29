import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import Header from '../pages/Header';
import { ViewerContext } from '../context/ViewerProvider';

export default () => (
  <ViewerContext.Consumer>
    {({ loading, viewer, error }) => {
      if (loading) return '';
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      }
      return (
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/items" component={Items} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/share" component={Share} />
            <Redirect to="/items" />
          </Switch>
        </Fragment>
      );
    }}
  </ViewerContext.Consumer>
);
