import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import LensStore from './LensStore';
import { fromObjectProperty } from '../utils/Lens';
import React from 'react/addons';

/**
 * Data structure which handled by this store.
 */
export const profileScema = {
  name: null,
  description: null,
  url: null,
  location: null
};

export const profileLens = fromObjectProperty(profileScema);

class ProrfileStore extends ReduceStore {

  getInitialState() {
    return profileScema;
  }

  reduce(state, action) {
    switch (action.type) {
      case 'update':
        return React.addons.update(state, action.command);
      default:
        return state;
    }
  }

}

const instance = new ProrfileStore(AppDispatcher);
export default instance;
