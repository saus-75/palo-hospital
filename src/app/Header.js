import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <Menu size='huge' stackable inverted>
        <Menu.Item header as={ Link } to='/'> 
          <Icon inverted name='globe'/>
          Ground Control
        </Menu.Item>
        <Menu.Item name='Explore' as={ Link } to='/planet'/>
        <Menu.Menu position='right'>
          <Menu.Item name='Contact Us' as={ Link } to='/contact'/>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
