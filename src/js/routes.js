import React from 'react';
import Router, {Route} from 'react-router';

import App from './App';
import Home from './pages/Home';

const DefaultRoute = Router.DefaultRoute;

const routes = (
                 <Route handler={App} path="/">
                   <DefaultRoute handler={Home} />
                 </Route>
               );

export default routes;
