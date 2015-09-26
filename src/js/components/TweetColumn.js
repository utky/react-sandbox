import React, { Component, PropTypes } from 'react';
import Tweets from '../components/Tweets';

export default class TweetColumn extends Component {

  static propsType = {
    title: PropTypes.string.isRequired,
    totalColumns: PropTypes.number,
    data: PropTypes.array
  };

  getDefaultProps() {
    return {
      totalColumns: 1,
      data: []
    };
  }

  render() {

    const columnStyle = [
            'tweet-column',
            `pure-u-1-${this.props.totalColumns}`]
            .reduce((x, y) => x + ' ' + y);

    return (
      <div className={columnStyle}>
        <Tweets data={this.props.data} title={this.props.title} />
      </div>
    );
  }

}
