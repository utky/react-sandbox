import { dispatch } from '../AppDispatcher';

export function update(type, value) {
  return dispatch(type, {
      value: value
    });
}

