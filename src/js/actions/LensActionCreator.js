import AppDispatcher from '../AppDispatcher';

export function update(lens, value) {
  AppDispatcher.dispatch({
    type: 'lens',
    lens: lens,
    value: value
  });
}

