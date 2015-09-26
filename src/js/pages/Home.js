import React, { Component, PropTypes } from 'react/addons';
import connectToStores from '../utils/connectToStores'
import DocumentTitle from 'react-document-title';
import MessageStore from '../stores/MessageStore';
import TweetColumn from '../components/TweetColumn';
import PostTweet from '../components/PostTweet';
import EditProfile from '../components/EditProfile';
import UserTypes from '../constants/UserTypes';
import { hold } from '../utils/ValueHolder';
import selectn from 'selectn';

const update = React.addons.update;


/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  console.log('called home getState');
  return {
    post: {
      text: hold('')
    }
  };
}

function stateToLens(state) {
  return;
}

@connectToStores([MessageStore], getState)
export default class Home extends Component {

  static propTypes = {
    params: PropTypes.shape({
      title: PropTypes.string,
    }),

    // state injected
    post: PropTypes.shape({
      text: UserTypes.valueLink
    })
      
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
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

    const mkSetter = (selector, value) => {

      const unit = (name, v) => {
        let entry = {};
        entry[name] = { $set: v };
        return entry;
      };

      let idx = selector.indexOf('.');

      if (idx < 0) {
        return unit(selector, value);
      }
      else {
        let name = selector.substring(0, idx); 
        let tailSelector = selector.substring(idx + 1); 
        let entry = {};
        entry[name] = mkSetter(tailSelector, value);
        return entry;
      }
    };

    const mkLink = (selector) => {
      const _value = selectn(selector, this.state);
      return {
        value: _value,
        requestChange: (v) => {
          const setter = mkSetter(selector, v);
          const newState = update(this.state, setter);
          this.setState(newState);
        }
      };
    };

    const profileLinks = {
      name: mkLink('profile.name'),
      description: mkLink('profile.description'),
      url: mkLink('profile.url'),
      location: mkLink('profile.location')
    };

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

