import React, { Component, PropTypes, findDOMNode } from 'react';
import DataGrid from 'react-datagrid';
import 'react-datagrid/index.css';

let columns = [
    {name: "id", title: "識別子"},
    {name: "name", title: "お名前"},
    {name: "age", title: "年齢"},
]

let getData = () => [
    {"id": 1, "name": "John", "age": 14},
    {"id": 2, "name": "Emily", "age": 15},
    {"id": 3, "name": "Paul", "age": 16}
]


export default class DataTable extends Component {

  static propTypes = {
  };

  render() {
    return (
      <div className='DataTable'>
        <DataGrid
            idProperty='id'
            dataSource={getData()}
            columns={columns} />
      </div>
    );
  }
}
