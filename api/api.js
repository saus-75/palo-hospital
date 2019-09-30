const express = require('express');

const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const services = require('./services');

const severity = require('./test_data/severity_data.json');
const patient = require('./test_data/patient_data.json');

// For testing and backup
const backupHospitals = require('./test_data/hospital_data.json');
const backupIllnesses = require('./test_data/illness_data.json');

const { calculateWaitingTime } = services;

const app = express();

const hospitalDB = [];
const waitListDB = {};
const illnessDB = [];
const severityDB = severity;
const patientDB = patient;

const SEVERITY = { MIN: 0, MAX: 4 };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/getAllHospitals', (req, res) => {
  if (hospitalDB) {
    const hospitals = hospitalDB.map(hospital => {
      const { id, name, location } = hospital;
      const waitingList = waitListDB[id];
      const totalWaitTime = calculateWaitingTime(waitingList);
      return { id, name, totalWaitTime, location };
    });
    res.json({ hospitals });
  } else {
    res.status(500).json({ error: 'Database down' });
  }
});

app.get('/getAllIllnesses', (req, res) => {
  if (illnessDB) {
    res.json({ illnesses: illnessDB });
  } else {
    res.status(500).json({ error: 'Database down' });
  }
});

app.get('/getAllSeverity', (req, res) => {
  if (severityDB) {
    res.json({ severities: severityDB });
  } else {
    res.status(500).json({ error: 'Database down' });
  }
});

app.get('/getAllPatients', (req, res) => {
  if (patientDB) {
    const patients = Object.keys(patientDB).map(key => {
      const { firstName, lastName, illness, severity, hospitalId } = patientDB[key];
      const hospital = hospitalDB.find(hp => hp.id === hospitalId);
      return { id: key, firstName, lastName, illness, severity, hospital: hospital.name };
    });
    res.json({ patients });
  } else {
    res.status(500).json({ error: 'Database down' });
  }
});

app.get('/getHospitalsBySeverity', (req, res) => {
  const {
    query: { severityId }
  } = req;

  if (severityId && severityId >= SEVERITY.MIN && severityId <= SEVERITY.MAX) {
    const hospitals = hospitalDB.map(hospital => {
      const { id, name, location } = hospital;
      const waitingList = waitListDB[id];
      const filteredWaitingList = waitingList.filter(waitList => waitList.levelOfPain >= severityId);
      const totalWaitTime = calculateWaitingTime(filteredWaitingList);
      return { id, name, totalWaitTime, filteredWaitingList, location };
    });
    res.json({ hospitals });
  } else {
    res.status(404).json({ error: 'Invalid Severity ID' });
  }
});

app.get('/getPatient', (req, res) => {
  const {
    query: { userId }
  } = req;
  if (userId) {
    const patient = patientDB[userId];
    if (patient) {
      const { severity, hospitalId } = patient;
      const severityObj = severityDB.find(db => db.value === severity);
      const hospital = hospitalDB.find(hp => hp.id === hospitalId);
      res.json({ patient: { ...patient, severity: severityObj, hospital } });
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  }
  res.status(404).json({ error: 'Invalid Patient ID' });
});

app.post('/postPatientForm', (req, res) => {
  const userId = uuid();
  const {
    body: { firstName, lastName, illness, severity, hospital }
  } = req;

  if (
    firstName &&
    lastName &&
    illness &&
    (severity !== undefined || severity !== null) &&
    hospital &&
    hospital.id &&
    hospital.totalWaitTime
  ) {
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
  } else {
    res.status(404).json({ error: 'Missing values, cannot add user' });
  }
});

const createDB = ({ hospitals, illnesses }) => {
  hospitals.forEach(hospital => {
    const { id, name, location, waitingList } = hospital;
    hospitalDB.push({ id, name, location });
    waitListDB[id] = waitingList;
  });
  illnessDB.push(...illnesses);
};

if (process.env.NODE_ENV === 'test') {
  createDB({ hospitals: backupHospitals, illnesses: backupIllnesses });
}

module.exports = { app, createDB };
