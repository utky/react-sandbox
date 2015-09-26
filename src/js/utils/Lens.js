import React from 'react/addons';


export default class Lens {

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

export const identity = new Lens((s) => s, (s, b) => s);

function propGet(name) {
  return (s) => {
    return s[name];
  };
}

function propSet(name) {
  return (s, b) => {
    let setter = {};
    setter[name] = { $set: b };
    return React.addons.update(s, setter);
  };
}

export function plens(name) {
  return new Lens(propGet(name), propSet(name));
}
