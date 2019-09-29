const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const hospitals = require('./test_data/hospital_data.json');
const illnesses = require('./test_data/illness_data.json');
const severity = require('./test_data/severity_data.json');
const patient = require('./test_data/patient_data.json');

const services = require('./services');
const { retrieveHospitalList, retrieveIllnessList, calculateWaitingTime } = services;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const hospitalDB = [];
const waitListDB = {};
const illnessDB = [];
const severityDB = severity;
const patientDB = patient;

const createDB = ({ hospitals, illnesses }) => {
  hospitals.forEach(hospital => {
    const { id, name, location, waitingList } = hospital;
    hospitalDB.push({ id, name, location });
    waitListDB[id] = waitingList;
  });
  illnessDB.push(...illnesses);
};

app.get('/getAllHospitals', (req, res) => {
  const hospitals = hospitalDB.map(hospital => {
    const { id, name, location } = hospital;
    const waitingList = waitListDB[id];
    const totalWaitTime = calculateWaitingTime(waitingList);
    return { id, name, totalWaitTime, location };
  });
  res.json({ hospitals });
});

app.get('/getAllIllnesses', (req, res) => {
  res.json({ illnesses: illnessDB });
});

app.get('/getAllSeverity', (req, res) => {
  res.json({ severities: severityDB });
});

app.get('/getAllPatients', (req, res) => {
  const patients = Object.keys(patientDB).map(key => {
    const { firstName, lastName, illness, severity, hospitalId } = patientDB[key];
    const hospital = hospitalDB.find(hp => hp.id === hospitalId);
    return { id: key, firstName, lastName, illness, severity, hospital: hospital.name };
  });
  res.json({ patients });
});

app.get('/getHospitalsBySeverity', (req, res) => {
  const {
    query: { severityId }
  } = req;
  const hospitals = hospitalDB.map(hospital => {
    const { id, name, location } = hospital;
    const waitingList = waitListDB[id];
    const filteredWaitingList = waitingList.filter(waitList => waitList.levelOfPain >= severityId);
    const totalWaitTime = calculateWaitingTime(filteredWaitingList);
    return { id, name, totalWaitTime, filteredWaitingList, location };
  });
  res.json({ hospitals });
});

app.post('/postPatientForm', (req, res) => {
  const userId = uuid();
  const { body } = req;
  const { firstName, lastName, illness, severity, hospital } = body;

  waitListDB[hospital.id][severity].patientCount += 1;

  patientDB[userId] = {
    firstName,
    lastName,
    illness,
    severity,
    totalWaitTime: hospital.totalWaitTime,
    hospitalId: hospital.id
  };

  res.json({ userId });
});

app.get('/getPatient', (req, res) => {
  const {
    query: { userId }
  } = req;
  const patient = patientDB[userId];

  if (patient) {
    const { severity, hospitalId } = patient;
    const severityObj = severityDB.find(db => db.value === severity);
    const hospital = hospitalDB.find(hp => hp.id === hospitalId);
    res.json({ patient: { ...patient, severity: severityObj, hospital } });
  } else {
    res.json({});
  }
});

app.listen(port, async () => {
  console.log('--------------------------------------');
  console.log('Fetching Hospital Info...');
  const hospitals = await retrieveHospitalList('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals');
  console.log('Fetching Illness Info...');
  const illnesses = await retrieveIllnessList('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses');
  console.log('--------------------------------------');
  console.log('Database Initialising...');
  createDB({ hospitals, illnesses });
  console.log('--------------------------------------');
  console.log(`Listening on port ${port}...`);
});
