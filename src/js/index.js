import React from 'react';
import { Router } from 'react-router';
import routes from './routes';

const rootEl = document.getElementById('root');

React.render(<Router>{routes}</Router>, rootEl);
