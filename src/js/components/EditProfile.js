import React, { Component, PropTypes } from 'react';
import UserTypes from '../constants/UserTypes';

export default class EditProfile extends Component {

  static propTypes = {
    links: PropTypes.shape({
      name: UserTypes.valueLink,
      description: UserTypes.valueLink,
      url: UserTypes.valueLink,
      location: UserTypes.valueLink
    })
  };

  render() {
    return (
      <form className='pure-form pure-form-stacked'>

        <fieldset>

          <input id="name" type="text"
            placeholder="Name" valueLink={this.props.links.name}/>

          <textarea id="description"
            placeholder="Description" valueLink={this.props.links.description}></textarea>

          <input id="url" type="text"
            placeholder="URL" valueLink={this.props.links.url}/>

          <input id="location" type="text"
            placeholder="Location" valueLink={this.props.links.location}/>

        </fieldset>

      </form>
    );
  }
}
