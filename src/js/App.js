import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

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
          <div class="nav">
            <Link to="datatable">DataTable</Link>
          </div>
          <div class="main">
            {this.props.children}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
