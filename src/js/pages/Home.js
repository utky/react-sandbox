import React, { Component, PropTypes } from 'react';
import { Container } from 'flux/utils'; 
import connectToStores from '../utils/connectToStores'
import DocumentTitle from 'react-document-title';
import MessageStore from '../stores/MessageStore';
import TweetColumn from '../components/TweetColumn';
import PostTweet from '../components/PostTweet';
import EditProfile from '../components/EditProfile';
import UserTypes from '../constants/UserTypes';
import { lensStateLink, mapLink, mapLinkTree, fromObjectProperty } from '../utils/Lens';

import ProfileStore from '../stores/ProfileStore';
import * as LensActionCreator from '../actions/LensActionCreator';



class Home extends Component {

  static propTypes = {
  };

  static getStores() { return [ProfileStore]; }

  static calculateState(prevState) {
    return ProfileStore.getState();
  }

  onSubmit(e) {
    e.preventDefault();
    alert('Tweeting: ' + this.props.post.text.value);
  }

  render() {
    const columnsSize = 2;

    const columnStyle = [
            'tweet-column',
            `pure-u-1-${columnsSize}`]
            .reduce((x, y) => x + ' ' + y);

    const requestor = (selector) => {
      return (v) => {
        LensActionCreator.update(selector, v);
      };
    };
    const stateLens = fromObjectProperty(ProfileStore.getInitialState());
    const profileLinks = {
      name: {
        value: this.state.name,
        requestChange: requestor('name')
      },
      description:{
        value: this.state.description,
        requestChange: requestor('description')
      },
      url:{
        value: this.state.url,
        requestChange: requestor('url')
      },
      location:{
        value: this.state.location,
        requestChange: requestor('location')
      },
    };

    return (
      <DocumentTitle title={this.props.title || 'Tweets!!'}>
        <div className='content'>
          <div id='profile'>
            <EditProfile links={profileLinks} />
          </div>
          <div className='timelines tweet-columns pure-g'>
          
            <TweetColumn data={[]}
                         title={'Home'}
                         totalColumns={columnsSize}/>

            <TweetColumn data={[]}
                         title={'Mentions'}
                         totalColumns={columnsSize}/>

          </div>
        </div>
      </DocumentTitle>
    );
  }
}

const container = Container.create(Home); 
export default container;
