import React, { PropTypes } from 'react';
import Router, { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

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
    return (
      <DocumentTitle title='Sample App'>
        <div className='App'>
          <Navigation />
          <div className="container">
            <RouteHandler/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
