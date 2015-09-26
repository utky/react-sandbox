import React, { Component, PropTypes } from 'react';

export default class Navigation extends Component {

  render() {
    return (
      <div className='pure-menu tweet-menu'>

        <span className='pure-menu-heading'><a className='pure-menu-link' href='#'>Twittee</a></span>

        <div>
          <button className='pure-button pure-button-primary'>Tweet</button>
        </div>

        <ul className='pure-menu-list'>

          <li className='pure-menu-item'>
            <a href='#' className='pure-menu-link'>Home</a>
          </li>

          <li className='pure-menu-heading'>List</li>

          <li className='pure-menu-item'>
            <a href='#' className='pure-menu-link'>tech</a>
          </li>

          <li className='pure-menu-item'>
            <a href='#' className='pure-menu-link'>security</a>
          </li>

        </ul>

      </div>
    );
  }

}
