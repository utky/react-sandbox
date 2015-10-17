import React, { Component, PropTypes } from 'react';
import ImmutableRender from '../utils/ImmutableRender';


@ImmutableRender
export default class EditProfile extends Component {

  static propTypes = {
    name: PropTypes.object,
    description: PropTypes.object,
    url: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    return (
      <form className='pure-form pure-form-stacked'>

        <fieldset>

          <input id="name" type="text"
            placeholder="Name" {...this.props.name} />

          <textarea id="description"
            placeholder="Description" {...this.props.description}></textarea>

          <input id="url" type="text"
            placeholder="URL" {...this.props.url}/>

          <input id="location" type="text"
            placeholder="Location" {...this.props.location}/>

        </fieldset>

      </form>
    );
  }
}
