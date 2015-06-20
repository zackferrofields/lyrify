import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/app';

injectTapEventPlugin();

React.render(
  <App />,
  document.body
);
