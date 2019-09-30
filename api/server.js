const api = require('./api');
const services = require('./services');

const backupHospitals = require('./test_data/hospital_data.json');
const backupIllnesses = require('./test_data/illness_data.json');

const { retrieveHospitalList, retrieveIllnessList } = services;
const { app, createDB } = api;

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    console.log('--------------------------------------');
    console.log('Fetching Hospital Info...');
    const hospitals = await retrieveHospitalList('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals');
    console.log('Fetching Illness Info...');
    const illnesses = await retrieveIllnessList('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses');
    console.log('--------------------------------------');
    console.log('Database Initialising...');
    createDB({ hospitals, illnesses });
    console.log('--------------------------------------');
  } catch (error) {
    console.error('Failed to fetch from API...');
    console.log('--------------------------------------');
    console.log('Local Database Initialising...');
    createDB({ hospitals: backupHospitals, illnesses: backupIllnesses });
    console.log('--------------------------------------');
  }

  console.log(`Listening on port ${port}...`);
});
