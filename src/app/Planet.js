import React, { Component } from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/Planet.css';

class Planet extends Component {
  constructor(props){
    super(props);
    this.state = { planets : [] };
  }

  componentDidMount(){
    fetch('/getPlanetList')
    .then((resp) => {
      return resp.json();
    }).then((resp) => {
      console.log(resp);
      this.setState({planets : resp})
    });
  }
  render() {
    let planets = this.state.planets;
    return (
      <div className='Planet'>
        <Header inverted size='huge'> Choose a planet. </Header>
        <Grid>
          {
            planets.length !== 0 ?
              <Grid.Row columns={4}>
                {
                  planets.planets.map((planet) => 
                    <Grid.Column key={planet}>
                      <Image 
                        src={'/planets/' + planet + '.png'}
                        as={ Link }
                        to= {{pathname: '/about/', search: '?p='+planet, state: {planets: planet}}}
                      />
                    </Grid.Column>
                  )
                }
              </Grid.Row>
            : null
          }
        </Grid>
      </div>
    );
  }
}

export default Planet;