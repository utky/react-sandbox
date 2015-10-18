import im from 'immutable';
import _ from 'underscore';

export function isEqual(lhs, rhs) {
  return _.isEqual(lhs, rhs) || im.is(lhs, rhs);
}

export function deepEqual(objA, objB) {
  return shallowEqual$(objA, objB, isEqual);
}


export function shallowEqual$(objA, objB, predicate) {
  if (objA === objB || predicate(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || !predicate(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}


