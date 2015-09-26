import React, { Component, PropTypes } from 'react';


export default class Tweet extends Component {

  static propsType = {
    datum: PropTypes.array
  };

  render() {
    return (
      <li className='pure-menu-item tweet-item'>
        <div className='tweet'>
          <div className='pure-g'>
            <div className='pure-u-1-6'>
              <img src='http://www.gravatar.com/avatar/99086b8c1104bc9f2b719d2899c7c35d' />
            </div>
            <div className='pure-u-5-6'>
              <div className='tweet-header'>
                <span>{this.props.datum.name}</span>
                <span>{this.props.datum.screenName}</span>
              </div>
              <div className='tweet-content'>
                {this.props.datum.text}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }


}
