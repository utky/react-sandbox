import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';


// const _messages = {};
const _messages = {
  '1': {
    id: 1,
    text: "message 1",
    timestamp: "2015-05-02 00:24:01"
  },
  '2': {
    id: 2,
    text: "message 2",
    timestamp: "2015-05-02 00:24:02"
  },
  '3': {
    id: 3,
    text: "message 3",
    timestamp: "2015-05-02 00:24:03"
  }
};

const MessageStore = createStore({
  contains(id, fields) {
    return isInBag(_messages, id, fields);
  },

  get(id) {
    return _messages[id];
  },
  
  getAll() {
    let result = [];
    for (let k in _messages) {
      result.push(_messages[k]);
    }
    return result;
  }
});

MessageStore.dispatchToken = register(action => {
  const responseRepos = selectn('response.entities.repos', action);
  if (responseRepos) {
    mergeIntoBag(_messages, responseRepos);
    MessageStore.emitChange();
  }
});

export default MessageStore;
