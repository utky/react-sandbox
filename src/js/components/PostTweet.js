import React, { Component, PropTypes } from 'react';
import UserTypes from '../constants/UserTypes';

export default class PostTweet extends Component {

  static propTypes = {
    links: PropTypes.shape({
      text: UserTypes.valueLink
    }),
    onSubmit: PropTypes.func
  };

  render() {
    return (
      <form className='pure-form'>
        <fieldset>
          <textarea placeholder='Message'
            className='pure-input-1-3'
            valueLink={this.props.links.text}></textarea>
          <button type='submit'
            className='pure-button pure-button-primary'
            onClick={this.props.onSubmit}>Tweet</button>
        </fieldset>
      </form>
    );
  }

  
}
