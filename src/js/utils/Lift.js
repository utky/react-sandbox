import React, { Component } from 'react';

export default function Lift(f) {
  return class LiftedComponent extends Component {
    render() {
      return f(this.props);
    }
  }
}
