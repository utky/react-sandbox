import React from 'react/addons';
import selectn from 'selectn';
import _ from 'underscore';


/**
 * Interface for React.addons.update.
 * UpdateProtocol is a object typed as
 *   key: string a name of protocol
 *   value: any -> object a function which returns update command.
 */
export const UpdateProtocol
    = {
      push: (v) => ({ $push: v }),
      unshift: (v) => ({ $unshift: v }),
      splice: (v) => ({ $splice: v }),
      set: (v) => ({ $set: v }),
      merge: (v) => ({ $merge: v }),
      apply: (v) => ({ $apply: v }),
    };

/**
 * Build a command for `React.addons.update`.
 *
 * `protocol` is the funciton which takes any value and then bind to
 * `update` command expression like `{ $set: value }`.
 *
 * `selector` is dot separated object property names like below.
 * `"root.childA.childB` translated to
 * `{ root: { childA: { childB: null } } }`
 *
 * `value` will be bound into `udpate` command.
 *
 * @param protocol: any -> object
 * @param selector: string
 * @param value: any
 */
function selectProtocol(protocol, selector, value) {
  let idx = selector.indexOf('.');
  if (idx < 0) {
    let setter = {};
    setter[selector] = protocol(value);
    return setter
  }
  else {
    let head = selector.substring(0, idx);
    let tail = selector.substring(idx + 1);
    let setter = {};
    setter[head] = selectProtocol(protocol, tail, value);
    return setter
  }
}

function linkProtocol(protocol, selector, linker) {
  const value = selectn(selector, linker.state);
  const requestChange = (v) => {
    const p = selectProtocol(protocol, selector, v);
    linker.callback(p);
  };
  return createLink(value, requestChange);
}

export function set(selector, linker) {
  return linkProtocol(UpdateProtocol.set, selector, linker);
}

export function merge(selector, linker) {
  return linkProtocol(UpdateProtocol.merge, selector, linker);
}

export function push(selector, linker) {
  return linkProtocol(UpdateProtocol.push, selector, linker);
}

export function unshift(selector, linker) {
  return linkProtocol(UpdateProtocol.unshift, selector, linker);
}

export function splice(selector, linker) {
  return linkProtocol(UpdateProtocol.splice, selector, linker);
}

export function apply(selector, linker) {
  return linkProtocol(UpdateProtocol.apply, selector, linker);
}

/**
 * ActinLinker links value change evnet to callback.
 *
 * `callback` is a change event listener which receives the command for `React.addons.update`.
 * In many cases, `callback` is the Action Creator.
 *
 * `state` is a source object to build valueLink.
 * ```
 * function updateForm(command) {
 *   return Dispatcher({
 *     type: 'update.some.form',
 *     command: command
 *   });
 * }
 *
 * const links = actoinLink(updateForm, this.state);
 * ```
 *
 */
class ActionLinker {
  constructor(callback, state) {
    this.callback = callback;
    this.state = state;
  }
  set(selector) {
    return set(selector, this);
  }
  merge(selector) {
    return merge(selector, this);
  }
  push(selector) {
    return push(selector, this);
  }
  unshift(selector) {
    return unshift(selector, this);
  }
  splice(selector) {
    return splice(selector, this);
  }
  apply(selector) {
    return apply(selector, this);
  }
}

export function actionLink(callback, state) {
  return new ActionLinker(callback, state);
}

/**
 * @param value : any
 * @parma callback : any -> void
 * @return object { value: *, requestChange: function }
 */
function createLink(value, callback) {
  return {
    value: value,
    requestChange: callback
  };
}

