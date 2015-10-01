import * as AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import { fromObjectProperty, plens } from '../utils/Lens';

const schema = {
  name: null,
  description: null,
  url: null,
  location: null
};

export const lenses = fromObjectProperty(schema);


class ProrfileStore extends ReduceStore {

  getInitialState() {
    return schema;
  }

  reduce(state, action) {
    switch (action.type) {
      case 'lens':
        console.log('lens action received');
        console.log('new state');
        const s = plens(action.selector).set(state, action.value);
        console.log(s);
        return s;
      default:
        return state;
    }
  }

}

const instance = new ProrfileStore(AppDispatcher);
export default instance;
