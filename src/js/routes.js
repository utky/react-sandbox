import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './pages/Home';


const routes = (
                 <Route component={App} path="/">
                   <IndexRoute component={Home} />
                 </Route>
               );

export default routes;
