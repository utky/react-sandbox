import React, { PropTypes } from 'react';
import Router, { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Actions from './actions/Actions';

const RouteHandler = Router.RouteHandler;

/**
 * Page Container
 * which contains common HTML elements like page title, navigatioin, footer
 */
export default class App {
  static propTypes = {
    children: PropTypes.object
  };

  render() {

    let john = Actions.Trait.Person('john', 12);
    var res = null;
    if (john instanceof Actions.Trait.Person) {
      res = 'John';
    }
    else {
      res = 'Other';
    }

    return (
      <DocumentTitle title='Sample App'>
        <div className='App'>
          <span>{res}</span>
          <Navigation />
          <div className="container">
            <RouteHandler/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
