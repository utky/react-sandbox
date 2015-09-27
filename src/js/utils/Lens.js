import React from 'react/addons';
import selectn from 'selectn';
import _ from 'underscore';

/**
 * DONT USE
 */
function reactSetter(selector, value) {
  let idx = selector.indexOf('.');
  if (idx < 0) {
    let setter = {};
    setter[selector] = { $set: value };
    return setter
  }
  else {
    let head = selector.substring(0, idx);
    let tail = selector.substring(idx + 1);
    let setter = {};
    setter[head] = reactSetter(tail, value);
    return setter
  }
}

/**
 * DONT USE
 */
export class PropertyLens {
  constructor(selector) {
    this.selector = selector;
  }
  get(s) {
    return selectn(this.selector, s);
  }
  set(s, b) {
    let setter = reactSetter(this.selector, b);
    return React.addons.update(s, setter);
  }
  compose(child) {
    let composedSelector = this.selector + '.' + child.selector;
    return new PropertyLens(composedSelector);
  }
}

export default class Lens {

  /**
   * s_a : s -> a
   * s_b_t : s -> b -> t
   */
  constructor(s_a, s_b_t) {
    this.s_a = s_a;
    this.s_b_t = s_b_t;
  }

  /**
   * @param s Owner
   * @returns a Ownee
   */
  get(s) {
    return this.s_a(s);
  }

  /**
   * @param s Owner
   * @param b New ownee
   * @returns s Updated owner
   */
  set(s, b) {
    return this.s_b_t(s, b);
  }

  /**
   * @param f : function a -> b
   * @param s
   * @returns s
   */
  over(f, s) {
    return this.set(s, f(this.get(s)))
  }

  /**
   * this: Lens s a
   * child: Lens a x
   * result: Lens s x
   */
  compose(child) {
    const getter = (s) => {
      return child.get(this.get(s));
    };

    const setter = (s, b) => {
      return this.set(s, child.set(this.get(s), b))
    };
    
    return new Lens(getter, setter);
  }

}

export function lens(getter, setter) {
  return new Lens(getter, setter);
}

function makeIdentity() {
  return new Lens((s) => s, (s, b) => b);
}

export const identity = makeIdentity();

export function propGet(name) {
  return (s) => {
    return s[name];
  };
}

export function propSet(name) {
  return (s, b) => {
    let setter = {};
    setter[name] = { $set: b };
    return React.addons.update(s, setter);
  };
}

function propSetState(name, stateSetter) {
  const setter = propSet(name);
  return (s, b) => {
    const result = setter(s, b);
    stateSetter(result);
    return result;
  };
}

function listenSet(lens, setCallback) {

  const getter = (s) => {
    return lens.get(s);
  };

  const setter = (s, b) => {
    const result = lens.set(s, b);
    setCallback(result);
    return result;
  };

  return new Lens(getter, setter);
}


export function plens(name) {
  return new Lens(propGet(name), propSet(name));
}

export function plensState(name, stateSetter) {
  return new Lens(propGet(name), propSetState(name, stateSetter));
}


function makeSubLens(mkLens, baseLens, source) {
  if (!source || source == null) {
    return baseLens;
  }
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      let subLens = baseLens.compose(mkLens(prop, source[prop]));
      baseLens[prop] = makeSubLens(mkLens, subLens, source[prop]);
    }
  }
  return baseLens
}

export function fromObject(mkLens, obj) {
  return makeSubLens(mkLens, {}, obj);
}

export function fromObjectProperty(obj) {
  const mkLens = (prop, value) => {
    return plens(prop);
    // return new PropertyLens(prop);
  };
  let dummyLens = {
    get: (s) => {},
    set: (s, b) => {},
    compose: (l) => l
  };
  return makeSubLens(mkLens, dummyLens, obj);
}

export function mapLink(lns, s, changeCallback) {
  return {
    value: lns.get(s),
    requestChange: (v) => {
      const result = lns.set(s, v);
      changeCallback(result);
    }
  };
}

export function mapLinkTree(lensTree, s, changeCallback) {
  let newTree = mapLink(lensTree, s, changeCallback);

  for (let prop in lensTree) {
    if (lensTree.hasOwnProperty(prop) && lensTree[prop] instanceof Lens) {
      newTree[prop] = mapLinkTree(lensTree[prop], s, changeCallback);
    }
  }

  return newTree;
}

export function lensStateLink(obj, changeCallback) {
  return mapLinkTree(fromObjectProperty(obj), obj, changeCallback);
}
