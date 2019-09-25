const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;

const planets = ['earth', 'jupiter', 'mars', 'mercury', 'neptune', 'saturn', 'uranus', 'venus'];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

app.get('/getPlanetList', (req, res) => {
  res.send({ planets: planets });
});

app.get('/getPlanetInfo', (req, res) => {
  let info = {}
  planets.forEach((planet) => {
    info[planet] = {name: planet.capitalize(), info: planet.capitalize() + " is a pretty cool planet. You should buy it!", cost: '$12,000,000,000,000',}
  });
  let planet = req.query.planet;
  if (planet !== undefined){
    console.log(planet);
    res.send(info[planet]);
  } else {
    res.send(info);
  }
});

app.post('/enquiry', (req, res) => {
  console.log(req.body.info);
  res.send({ success: 'Enquiry Received!' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));