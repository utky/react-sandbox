import React, { Component, PropTypes } from 'react';
import { Container } from 'flux/utils'; 
import connectToStores from '../utils/connectToStores'
import DocumentTitle from 'react-document-title';
import MessageStore from '../stores/MessageStore';
import TweetColumn from '../components/TweetColumn';
import PostTweet from '../components/PostTweet';
import EditProfile from '../components/EditProfile';
import UserTypes from '../constants/UserTypes';

import ProfileStore from '../stores/ProfileStore';
import * as UpdateAction from '../actions/UpdateAction';
import { actionLink, set } from '../utils/ValueLink';

/**
 * Store: Action -> Signal ()
 */

/**
 * Container which distribute state from Stores to Ownees
 */
class Home extends Component {

  static getStores() { return [ProfileStore]; }

  static calculateState(prevState) {
    return {
      profile: ProfileStore.getState()
    };
  }

  render() {

    const linker = actionLink(UpdateAction.update, this.state.profile);

    return (
      <DocumentTitle title={this.props.title || 'Tweets!!'}>
        <div className='content'>
          <div id='profile'>
            <EditProfile
                name={linker.set('name')}
                description={linker.set('description')}
                url={set('url', linker)}
                location={linker.set('location')} />
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
