import React from 'react';
import Router from 'react-router';
import routes from './routes';

const rootEl = document.getElementById('root');

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, rootEl);
});
