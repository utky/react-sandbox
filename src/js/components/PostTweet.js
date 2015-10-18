import React, { Component, PropTypes } from 'react';
import ImmutableRender from '../utils/ImmutableRender';

@ImmutableRender
export default class PostTweet extends Component {

  static propTypes = {
    text: PropTypes.object,
    onSubmit: PropTypes.func
  };

  render() {
    return (
      <form className='pure-form'>
        <fieldset>
          <textarea placeholder='Message'
            className='pure-input-1-3'
            {...this.props.text}></textarea>
          <button type='submit'
            className='pure-button pure-button-primary'
            onClick={this.props.onSubmit}>Tweet</button>
        </fieldset>
      </form>
    );
  }

  
}
