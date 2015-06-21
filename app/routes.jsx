import React from 'react';
import {Route} from 'react-router';
import App from './components/app';

const Routes = (
  <Route name="app" path="/" handler={App} />
);

export default Routes;
