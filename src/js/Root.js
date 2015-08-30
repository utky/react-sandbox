import React, { PropTypes, Component } from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import DataTable from './components/DataTable';
// import RepoPage from './pages/RepoPage';
// import UserPage from './pages/UserPage';

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;
    // Hot module!!
    return (
      <Router history={history}>
        <Route name='app' path='/' component={App}>
          <Route name="datatable" path="/datatable" component={DataTable} />
        </Route>
      </Router>
    );
  }
}
