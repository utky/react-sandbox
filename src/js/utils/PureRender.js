import shouldPureComponentUpdate from 'react-pure-render/function';

export default function PureRender(Component) {
  Component.prototype.shouldComponentUpdate = shouldPureComponentUpdate;
  return Component;
};
