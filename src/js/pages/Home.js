import React, { Component, PropTypes } from 'react';
import { Container } from 'flux/utils'; 
import connectToStores from '../utils/connectToStores'
import DocumentTitle from 'react-document-title';
import MessageStore from '../stores/MessageStore';
import TweetColumn from '../components/TweetColumn';
import PostTweet from '../components/PostTweet';
import EditProfile from '../components/EditProfile';
import UserTypes from '../constants/UserTypes';

import ProfileStore, { schema } from '../stores/ProfileStore';
import { lensLink } from '../utils/ValueLink';


class Home extends Component {

  static getStores() { return [ProfileStore]; }

  static calculateState(prevState) {
    return ProfileStore.getState();
  }

  render() {
    const columnsSize = 2;

    const columnStyle = [
            'tweet-column',
            `pure-u-1-${columnsSize}`]
            .reduce((x, y) => x + ' ' + y);


    console.log('current state');
    console.log(this.state);
    const profileLinks = lensLink(this.state, schema);

    return (
      <DocumentTitle title={this.props.title || 'Tweets!!'}>
        <div className='content'>
          <div id='profile'>
            <EditProfile links={profileLinks} />
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
