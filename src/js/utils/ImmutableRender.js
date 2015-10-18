import im from 'immutable';
import _ from 'underscore';
import { deepEqual } from './Equality';

export default function ImmutableRender(Component) {
  Component.prototype.shouldComponentUpdate = shouldImmutableComponentUpdate;
  return Component;
};


function shouldImmutableComponentUpdate(nextProps, nextState) {
  // return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
  const propsEq = deepEqual(this.props, nextProps);
  const stateEq = deepEqual(this.state, nextState);
  console.log('current props');
  console.log(this.props);
  console.log('next props');
  console.log(nextProps);
  const eq = !propsEq || !stateEq;
  console.log('check props equals');
  console.log(eq);
  return eq;
}

