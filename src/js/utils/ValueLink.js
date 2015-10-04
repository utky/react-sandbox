import React from 'react/addons';
import selectn from 'selectn';
import _ from 'underscore';
import Lens from '../utils/Lens';
import * as LensActionCreator from '../actions/LensActionCreator';

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

class ActionLinker {
  constructor(callback, state) {
    this.callback = callback;
    this.state = state;
  }
}

export function actionLink(callback, state) {
  return new ActionLinker(callback, state);
}

export const UpdateProtocol
    = {
      push: (v) => ({ $push: v }),
      unshift: (v) => ({ $unshift: v }),
      splice: (v) => ({ $splice: v }),
      set: (v) => ({ $set: v }),
      merge: (v) => ({ $merge: v }),
      apply: (v) => ({ $apply: v }),
    };


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

/**
 * type ValueLink a = (a, a -> Signal ())
 * or
 * data ValueLink a = ValueLink
 *                  { value: a
 *                  , requestChange: a -> Signal ()
 *                  }
 * in Haskell
 */

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



/**
 * @param f : any -> void
 * @parma link : object { value: *, requestChange: function }
 * @return object { value: *, requestChange: function }
 */
function sequence(link, ...fs) {
  const g = (v) => {
    link.requestChange(v);
    fs.map((f) => f(v));
  };
  return createLink(link.value, g)
}

function createLensLink(lens, value) {
  const callback = (newValue) => {
    LensActionCreator.update(lens, newValue);
  };
  return createLink(value, callback);
}

function recursiveLensLink(state, lenses) {
  if (lenses == null) {
    return createLensLink(lenses, state);
  }
  else {
    let container = {};
    for (let prop in lens) {
       if (!schema.hasOwnProperty(prop)) {
         continue;
       }

       const nextState = state[prop];
       const nextSchema = schema[props];
       const nextSelector = selector + '.' + prop;
       container[prop] = recursiveLensLink(nextState, nextSchema, nextSelector);
    }
    return container;
  }
}


export function lensLink(state, lenses) {
  let root = {};

  for (let prop in lenses) {
    root[prop] = recursiveLensLink(state[prop], lenses[prop], prop);
  }

  return root;
}


function traverseObject(f, obj, prop='') {
  if (!obj || !_.isObject(obj)) {
    return f(obj, prop);
  }

  return _.mapObject(obj, (val, key) => {
    if (!obj.hasOwnProperty(key)) {
      return val;
    }
    return traverseObject(f, val, key);
  });
}
