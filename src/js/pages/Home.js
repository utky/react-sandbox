import React, { Component, PropTypes } from 'react';
import { Input, Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <form>
        <Input type='text' label='Text' placeholder='Enter text' /> 
        <Input type='textarea' label='Text Area' placeholder='textarea' /> 
        <Button bsStyle='primary'>Primary</Button>
      </form>
    );
  }
}

