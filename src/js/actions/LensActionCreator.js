import AppDispatcher from '../AppDispatcher';

export function update(selector, value) {
  AppDispatcher.dispatch({
    type: 'lens',
    selector: selector,
    value: value
  });
}

