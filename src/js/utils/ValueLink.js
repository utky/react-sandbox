import * as LensActionCreator from '../actions/LensActionCreator';

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

function createLensLink(selector, value) {
  const callback = (newValue) => {
    LensActionCreator.update(selector, newValue);
  };
  return createLink(value, callback);
}

function recursiveLensLink(state, schema, selector) {
  if (schema == null) {
    return createLensLink(selector, state);
  }
  else {
    let container = {};
    for (let prop in schema) {
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

export function lensLink(state, schema) {
  let root = {};

  for (let prop in schema) {
    root[prop] = recursiveLensLink(state[prop], schema[prop], prop);
  }

  return root;
}
