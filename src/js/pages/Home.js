import React, { Component, PropTypes } from 'react';
import { Container } from 'flux/utils'; 
import connectToStores from '../utils/connectToStores'
import DocumentTitle from 'react-document-title';
import MessageStore from '../stores/MessageStore';
import TweetColumn from '../components/TweetColumn';
import PostTweet from '../components/PostTweet';
import EditProfile from '../components/EditProfile';
import UserTypes from '../constants/UserTypes';

import TweetStore from '../stores/TweetStore';
import ProfileStore from '../stores/ProfileStore';
import * as UpdateAction from '../actions/UpdateAction';
import * as LensAction from '../actions/LensActionCreator';
import { createLink, actionLink, set } from '../utils/ValueLink';
import im from 'immutable';
import ActionTypes from '../constants/ActionTypes';

function makeAction(type) {
  return (v) => { LensAction.update(type, v); };
}

/**
 * Store: Action -> Signal ()
 */
const listeners = {
  name: makeAction(ActionTypes.profile.name.update),
  description: makeAction(ActionTypes.profile.description.update),
  url: makeAction(ActionTypes.profile.url.update),
  location: makeAction(ActionTypes.profile.location.update),
  text: makeAction(ActionTypes.posttweet.text.update),
};

const debugChange = (x) => {
  console.log('value changed');
  console.log(x);
};

function makeListener() {

}

function postTweetProps(state) {
  const postTweet = state.postTweet;
  return {
    text: createLink(postTweet.get('text'), listeners.text),
    onSubmit: (e) => console.log(e.target.value)
  };
}

function profileProps(state) {
  const profile = state.profile;
  return {
    name: createLink(profile.get('name'), listeners.name),
    description: createLink(profile.get('description'), listeners.description),
    url: createLink(profile.get('url'), listeners.url),
    location: createLink(profile.get('location'), listeners.location)
  };
}

/**
 * Container which distribute state from Stores to Ownees
 */
class Home extends Component {

  static getStores() { return [TweetStore, ProfileStore]; }

  static calculateState(prevState) {
    return {
      profile: ProfileStore.getState(),
      postTweet: TweetStore.getState()
    };
  }

  render() {

    return (
      <DocumentTitle title={this.props.title || 'Tweets!!'}>
        <div className='content'>
          <div id='profile'>
            <EditProfile {...profileProps(this.state)} />
          </div>
          <div>
            <PostTweet {...postTweetProps(this.state)} />
          </div>
          <div className='timelines tweet-columns pure-g'>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

const container = Container.create(Home); 
export default container;
