import React from 'react';
import ReactRouter from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import Router from './components/router';

injectTapEventPlugin();

function bootstrap() {
  let mountNode = document.body;
  let AppRouter = ReactRouter.create({
    routes: routes
  });

  AppRouter.run((Root, state) => {
    React.render(<Root params={state.params} />, mountNode);
  });

  Router.set(AppRouter);
}

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
]).then(bootstrap);
