import React, { Component, PropTypes } from 'react';
import { Input, Button, Table } from 'react-bootstrap';
import connectToStores from '../utils/connectToStores'
import DocumentTitle from 'react-document-title';
import MessageStore from '../stores/MessageStore';


/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  const messages= MessageStore.getAll();

  return {
    messages
  };
}

@connectToStores([MessageStore], getState)
export default class Home {
  static propTypes = {
    title: PropTypes.string,
    messages: PropTypes.array
  };
  getDefaultProps() {
    return {
      title: "Default Title",
      messages: []
    }
  }
  render() {
    const { title, messages } = this.props;
    let rows = messages.map(x => {
      return (<tr><td>{x.id}</td><td>{x.text}</td><td>{x.timestamp}</td></tr>);
    });

    return (
      <DocumentTitle title={this.props.title}>
        <form>
          <Table>
            <thead>
              <tr><td>ID</td><td>TEXT</td><td>TIMESTAMP</td></tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
          <Input type='text' label='Text' placeholder='Enter text' /> 
          <Input type='textarea' label='Text Area' placeholder='textarea' /> 
          <Button bsStyle='primary'>Primary</Button>
        </form>
      </DocumentTitle>
    );
  }
}

