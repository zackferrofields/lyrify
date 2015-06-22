import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './components/app';
import Home from './components/home';
import Settings from './components/settings';

const Routes = (
  <Route handler={App} name="app" path="/">
    <Route handler={Settings} name="settings" path="/settings"/>
    <DefaultRoute handler={Home} name="home"/>
  </Route>
);

export default Routes;
