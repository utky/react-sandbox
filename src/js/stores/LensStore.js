import { fromObjectProperty, plens } from '../utils/Lens';

export default function LensStore(actionType) {

  return function(Store) {

    Store.prototype.reduceLens = (state, action) => {

      switch(action.type) {

        case actionType:
          return plens(action.selector).set(state, action.value);

        default:
          return state;
      }

    };

    return Store;
  };
}
