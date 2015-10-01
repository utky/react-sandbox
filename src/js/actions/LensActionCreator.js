import { dispatch } from '../AppDispatcher';

export function update(selector, value) {
  dispatch({
    type: 'lens',
    value: value
  });
}

