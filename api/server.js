const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

let hospitalDB = {};

const retrieveHospitalList = async () => {
    const response = await fetch('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals?limit=40');
    const list = await response.json();
    console.log(list);
    return list._embedded.hospitals;
}

app.get('/getHospitals', (req, res) => {
    res.send({ hospitals: hospitalDB});

});

app.listen(port, async() => {
    console.log(`Listening on port ${port}`);
    console.log('Initialising hospital data retrieval...');
    hospitalDB = await retrieveHospitalList();
});