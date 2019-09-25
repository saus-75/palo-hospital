const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const retrieveHospitalList = async () => {
    const response = await fetch('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals?limit=100&page=0');
    const list = await response.json();
    return list;
}

app.get('/getHospitals', async (req, res) => {
    const list = await retrieveHospitalList();
    res.send({hospitals: list});

});

app.listen(port, async() => {
    console.log(`Listening on port ${port}`);
});