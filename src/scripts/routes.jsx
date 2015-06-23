import React from 'react';
import {Route, Redirect} from 'react-router';
import App from './components/app';
import Home from './components/home';
import Settings from './components/settings';
import Explore from './components/explore';
import Playlists from './components/playlists';

const Routes = (
  <Route handler={App}>
    <Route handler={Settings} name="settings"/>
    <Route handler={Home} name="home">
      <Route handler={Explore} name="explore"/>
      <Route handler={Playlists} name="playlists"/>
    </Route>
    <Redirect from="/" to="/home/playlists" />
  </Route>
);

export default Routes;
