import AppDispatcher from '../AppDispatcher';

export function update(protocol) {
  return AppDispatcher.dispatch('update', { command: protocol });
}

