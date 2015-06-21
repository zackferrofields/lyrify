import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './components/app';
import Home from './components/home';
import Settings from './components/settings';

const Routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="settings" path="/settings" handler={Settings}/>
    <DefaultRoute name="home" handler={Home}/>
  </Route>
);

export default Routes;
