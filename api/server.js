const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 5000;

const hospitals = require('./test_data/hospital_data.json');
const illnesses = require('./test_data/illness_data.json');
const severity = require('./test_data/severity-data.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const hospitalDB = [];
const illnessDB = [];
const severityDB = severity;
const patientDB = {};

const retrieveHospitalList = async link => {
  try {
    const response = await fetch(link);
    const list = await response.json();

    let hospitals = list._embedded.hospitals;

    if (list._links.next) {
      const { href } = list._links.next;
      hospitals.push(...(await retrieveHospitalList(href)));
    }
    return hospitals;
  } catch (error) {
    console.error(error);
  }
};

const retrieveIllnessList = async link => {
  try {
    const response = await fetch(link);
    const list = await response.json();

    let illnesses = list._embedded.illnesses.map(illness => illness.illness);

    if (list._links.next) {
      const { href } = list._links.next;
      illnesses.push(...(await retrieveIllnessList(href)));
    }
    return illnesses;
  } catch (error) {
    console.error(error);
  }
};

const calculateWaitingTime = waitingList => {
  return (waitingList.reduce((a, b) => a + +b.averageProcessTime * b.patientCount, 0) / 60).toFixed(2);
};

app.get('/getAllHospitals', (req, res) => {
  const hospitals = hospitalDB.map(hospital => {
    const { id, name, waitingList, location } = hospital;
    const totalWaitTime = calculateWaitingTime(waitingList);
    return { id, name, totalWaitTime, location };
  });
  res.json({ hospitals });
});

app.get('/getHospitalsBySeverity', (req, res) => {
  const {
    query: { severityId }
  } = req;

  const hospitals = hospitalDB.map(hospital => {
    const { id, name, waitingList } = hospital;
    const filteredWaitingList = waitingList.filter(waitList => waitList.levelOfPain >= severityId);
    const totalWaitTime = calculateWaitingTime(filteredWaitingList);
    console.log(totalWaitTime);
    return { id, name, totalWaitTime, filteredWaitingList };
  });
  res.json({ hospitals });
});

app.get('/getAllIllnesses', (req, res) => {
  res.json({ illnesses: illnessDB });
});

app.get('/getAllSeverity', (req, res) => {
  res.json({ severities: severityDB });
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  console.log('Initialising Hospital Database...');
  // hospitalDB.push(...await retrieveHospitalList('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals'));
  hospitalDB.push(...hospitals);
  console.log('Initialising Illness Database...');
  // illnessDB.push(...await retrieveIllnessList('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses'));
  illnessDB.push(...illnesses);
});
