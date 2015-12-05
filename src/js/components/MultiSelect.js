import React, { Component, PropTypes } from 'react';


function renderOption(onChange, props) {

  const onCheckedChange = (e) => {
    if (onChange) {
      onChange(e, props);
    }
  };
  
  return (
    <div className='checkbox' key={props.key}>
      <label>
        <input type="checkbox" checked={props.checked} onChange={onCheckedChange} /> 
        {props.label}
      </label>
    </div>
  );
}

export default class MultiSelect extends Component {

  static propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func
  };



  render() {
    return (
      <div>
        {this.props.options.map(renderOption.bind(this, this.props.onChange))}
      </div>
    );
  }
}
