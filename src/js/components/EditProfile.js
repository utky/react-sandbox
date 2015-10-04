import React, { Component, PropTypes } from 'react';
import UserTypes from '../constants/UserTypes';
import PureRender from '../utils/PureRender';

@PureRender
export default class EditProfile extends Component {

  static propTypes = {
    name: UserTypes.valueLink.isRequired,
    description: UserTypes.valueLink.isRequired,
    url: UserTypes.valueLink.isRequired,
    location: UserTypes.valueLink.isRequired,
  };

  render() {
    return (
      <form className='pure-form pure-form-stacked'>

        <fieldset>

          <input id="name" type="text"
            placeholder="Name" valueLink={this.props.name}/>

          <textarea id="description"
            placeholder="Description" valueLink={this.props.description}></textarea>

          <input id="url" type="text"
            placeholder="URL" valueLink={this.props.url}/>

          <input id="location" type="text"
            placeholder="Location" valueLink={this.props.location}/>

        </fieldset>

      </form>
    );
  }
}
