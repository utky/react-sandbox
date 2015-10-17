import im from 'immutable';

export default function ImmutableRender(Component) {
  Component.prototype.shouldComponentUpdate = shouldImmutableComponentUpdate;
  return Component;
};

function shouldImmutableComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps, im.is) || !shallowEqual(this.state, nextState, im.is);
}


function shallowEqual(objA, objB, predicate) {
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


