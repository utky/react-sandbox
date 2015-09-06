import React from 'react';
import Router from 'react-router';
import routes from './routes';

const rootEl = document.getElementById('root');

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, rootEl);
});
