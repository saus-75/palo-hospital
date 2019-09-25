import React, { Component } from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/About.css';

class About extends Component {
  constructor(props){
    super(props);
    this.state = { info: {} };
  }

  componentDidMount(){
    console.log(this.props.location.state.planets);
    fetch('/getPlanetInfo?planet=' + this.props.location.state.planets)
    .then((resp) => {
      return resp.json();
    }).then((resp) => {
      console.log(resp);
      this.setState({info : resp})
    });
  }
  render() {
    let info = this.state.info;
    return (
      <div className='About'>
        <Header inverted className='about' size='huge'> About {info.name} </Header>
        <Grid>
          { 
            info.name !== undefined ?
              <Grid.Row columns = {2}>
                <Grid.Column>
                  <Image src={'/planets/' + info.name.toLowerCase() + '.png'}/>
                </Grid.Column>
                <Grid.Column className='info'>
                  <Header inverted size='medium'> Cost: {info.cost} </Header>
                  <Header inverted size='medium'> Info: {info.info} </Header>
                  <Button inverted color='blue' as= { Link } to='/contact'>Enquire Now!</Button>
                </Grid.Column>
              </Grid.Row>
            : null
          }
        </Grid>
      </div>
    );
  }
}

export default About;