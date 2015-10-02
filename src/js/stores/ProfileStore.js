import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import LensStore from './LensStore';
import { plens } from '../utils/Lens';

/**
 * Data structure which handled by this store.
 */
export const schema = {
  name: null,
  description: null,
  url: null,
  location: null
};

@LensStore('lens')
class ProrfileStore extends ReduceStore {

  getInitialState() {
    return schema;
  }

  reduce(state, action) {
    switch (action.type) {
      default:
        return this.reduceLens(state, action);
    }
  }

}

const instance = new ProrfileStore(AppDispatcher);
export default instance;
