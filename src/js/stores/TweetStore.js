import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import LensStore from './LensStore';
import { fromObjectProperty } from '../utils/Lens';
import React from 'react/addons';
import im from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import { ilens } from '../utils/Lens';
import _ from 'underscore';

/**
 * Data structure which handled by this store.
 */
const postSchema = {
  text: null,
};

/**
 * Traverse fields of record and generate lens for each fields.
 */
function makeLens(schema) {
  return _.mapObject(schema, (v, k) => ilens(k));
}

const postLens = makeLens(postSchema);

class TweetStore extends ReduceStore {

  getInitialState() {
    return im.fromJS(postSchema);
  }

  reduce(state, action) {
    switch (action.type) {

      case ActionTypes.posttweet.text.update:
        return postLens.text.set(state, action.value);

      default:
        return state;
    }
  }
}

const instance = new TweetStore(AppDispatcher);
export default instance;
