import React, { Component, PropTypes } from 'react';
import { Glyphicon, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Navigation extends Component {

  render() {
    return (
      <Navbar brand='React-Bootstrap'>
        <Nav>
          <NavItem eventKey={1} href='#'>
            <Glyphicon glyph='glyphicon glyphicon-calendar' />Schedule
          </NavItem>
          <NavItem eventKey={2} href='#'>
            <Glyphicon glyph='glyphicon glyphicon-wrench' />Maintenance
          </NavItem>
          <NavDropdown eventKey={3} title='Dropdown' id='basic-nav-dropdown'>
            <MenuItem eventKey='1'>
              Action
            </MenuItem>
            <MenuItem eventKey='2'>Another action</MenuItem>
            <MenuItem eventKey='3'>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey='4'>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }

}
