import React, { Component, PropTypes } from 'react';
import Tweet from '../components/Tweet';

export default class Tweets extends Component {

  static propsType = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array
  };

  render() {
    let tweets = this.props.data.map((tweet) => (<Tweet datum={tweet} />));
    return (
      <div className='pure-menu'>
        <span className='pure-menu-heading'>{this.props.title}</span>
        <ul className='pure-menu-list'>
          {tweets}
        </ul>
      </div>
    );
  }

}
