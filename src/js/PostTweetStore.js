import ReduceStore from 'flux/utils';
import { plens } from '../utils/Lens';

const schema = {
  draft: null
};


class PostTweetStore extends ReduceStore {

  getInitialState() {
    let state = schema;
    state.draft = '';
    return state;
  }

  reduce(state, action) {
    switch (action.type) {
      case 'input':
        let lens = plens('draft');
        return lens.set(state, action.text);
      default:
        return state;
    }
  }

}
