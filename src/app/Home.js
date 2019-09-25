import React, { Component } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import '../css/Home.css';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <Message size='massive'>
          <Message.Header size='massive'>
            Ground Control
          </Message.Header>
          <p>
            Managing all 8 planets in our Solar System.<br/>
            Find your galatic property now.
          </p>
          <Button inverted color='blue' as= { Link } to='/planet'>Let Explore!</Button>
        </Message>
      </div>
    );
  }
}

export default Home;
