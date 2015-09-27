import React, { Component, PropTypes } from 'react';
import connectToStores from '../utils/connectToStores'
import DocumentTitle from 'react-document-title';
import MessageStore from '../stores/MessageStore';
import TweetColumn from '../components/TweetColumn';
import PostTweet from '../components/PostTweet';
import EditProfile from '../components/EditProfile';
import UserTypes from '../constants/UserTypes';
import { lensStateLink, mapLink, mapLinkTree, fromObjectProperty } from '../utils/Lens';


/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  return {
  };
}

function getInitialState() {
  return {
    profile: {
      name: '',
      description: '',
      url: '',
      location: ''
    },
    tweet: {
      text: ''
    }
  };
}

@connectToStores([MessageStore], getState)
export default class Home extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = getInitialState();
  }  

  onSubmit(e) {
    e.preventDefault();
    alert('Tweeting: ' + this.props.post.text.value);
  }

  render() {
    const tweets= MessageStore.getAll();

    const columnsSize = 2;

    const columnStyle = [
            'tweet-column',
            `pure-u-1-${columnsSize}`]
            .reduce((x, y) => x + ' ' + y);

    const stateSetter = this.setState.bind(this);
    const stateLens = fromObjectProperty(getInitialState());
    const profileLinks = mapLinkTree(stateLens.profile, this.state, this.setState.bind(this));

    return (
      <DocumentTitle title={this.props.title || 'Tweets!!'}>
        <div className='content'>
          <div id='profile'>
            <EditProfile links={profileLinks} />
          </div>
          <div className='timelines tweet-columns pure-g'>
          
            <TweetColumn data={tweets}
                         title={'Home'}
                         totalColumns={columnsSize}/>

            <TweetColumn data={tweets}
                         title={'Mentions'}
                         totalColumns={columnsSize}/>

          </div>
        </div>
      </DocumentTitle>
    );
  }
}

