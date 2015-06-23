import React from 'react';
import Router from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './scripts/routes';

injectTapEventPlugin();

function bootstrap() {
  let mountNode = document.body;
  Router.run(routes, (Root, state) => { React.render(<Root params={state.params} />, mountNode); });
}

Promise.all([
  new Promise(resolve => { window.addEventListener('DOMContentLoaded', resolve); })
]).then(bootstrap);
