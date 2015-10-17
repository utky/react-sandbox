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
const profileScema = {
  name: null,
  description: null,
  url: null,
  location: null
};

const profileLens =
    _.keys(profileScema)
        .reduce((a, k) => Object.assign(a, { [k]: ilens(k) }), {});

class ProrfileStore extends ReduceStore {

  getInitialState() {
    return im.fromJS(profileScema);
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.profile.name.update:
        return profileLens.name.set(state, action.value);
      case ActionTypes.profile.description.update:
        return profileLens.description.set(state, action.value);
      case ActionTypes.profile.url.update:
        return profileLens.url.set(state, action.value);
      case ActionTypes.profile.location.update:
        return profileLens.location.set(state, action.value);
      default:
        return state;
    }
  }

}

const instance = new ProrfileStore(AppDispatcher);
export default instance;
