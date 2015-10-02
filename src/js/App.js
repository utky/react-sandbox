import React, { PropTypes } from 'react';
import { Router, Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Navigation from './components/Navigation';
import './main.css';
import 'purecss/build/pure.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import PostTweet from './components/PostTweet';
import UserTypes from './constants/UserTypes';
import connectToStores from './utils/connectToStores'
import { hold } from './utils/ValueHolder';


/**
 * Page Container
 * which contains common HTML elements like page title, navigatioin, footer
 */
export default class App {

  render() {
    return (
      <div className='app pure-g'>
        <div className='navigation pure-u-1-5'>
          <Navigation />
        </div>
        <div className='content pure-u-4-5'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
