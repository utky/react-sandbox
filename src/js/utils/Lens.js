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

export function get(lns, s) {
  return lns.get(s);
}

export function set(lns, s, b) {
  return lns.set(s, b);
}

export function over(lns, f, s) {
  return lns.over(f, s);
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
/**
 *
 */
export class ImmutableLens extends Lens {
  constructor(field) {
    const getter = (s) => {
      return s.get(field);
    };
    const setter = (s, b) => {
      return s.set(field, b);
    };
    super(getter, setter);
    this.field = field;
  }
}

export function ilens(field) {
  return new ImmutableLens(field);
}

/**
 * DONT USE
 */
export class PropertyLens extends Lens {

  constructor(selector) {

    const getter = (s) => {
      return selectn(selector, s);
    };

    const setter = (s, b) => {
      let command = reactSetter(selector, b);
      return React.addons.update(s, command);
    };

    super(getter, setter);

    this.selector = selector;
  }
  compose(child) {
    if (child instanceof PropertyLens) {
      let composedSelector = this.selector + '.' + child.selector;
      return new PropertyLens(composedSelector);
    }
    else {
      return super.compose(child);
    }
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
  return new PropertyLens(name);
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
