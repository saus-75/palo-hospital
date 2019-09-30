const request = require('supertest');
const api = require('./api');
const services = require('./services');

const { app } = api;
const { calculateWaitingTime } = services;

describe('Test getAllHospitals', () => {
  it('should retrieve an array containing objects of Hospitals', async () => {
    const res = await request(app)
      .get('/getAllHospitals')
      .set('Content-Type', 'application/json');

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty('hospitals');
    expect(JSON.parse(res.text).hospitals.length).toBe(23);
  });
});

describe('Test getAllIllnesses', () => {
  it('should retrieve an array containing objects of Illnesses', async () => {
    const res = await request(app)
      .get('/getAllIllnesses')
      .set('Content-Type', 'application/json');

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty('illnesses');
    expect(JSON.parse(res.text).illnesses.length).toBe(15);
  });
});

describe('Test getAllSeverity', () => {
  it('should retrieve an array containing objects of Illnesses', async () => {
    const res = await request(app)
      .get('/getAllSeverity')
      .set('Content-Type', 'application/json');

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty('severities');
    expect(JSON.parse(res.text).severities.length).toBe(5);
  });
});

describe('Test getAllPatients', () => {
  it('should retrieve an array containing objects of Illnesses', async () => {
    const res = await request(app)
      .get('/getAllPatients')
      .set('Content-Type', 'application/json');

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty('patients');
  });
});

describe('Test getHospitalsBySeverity', () => {
  it('should return 404 if severity id is not specified', async () => {
    const res = await request(app)
      .get('/getHospitalsBySeverity')
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toHaveProperty('error');
  });

  it('should return 404 if severity id exceeds the 0-4 scale', async () => {
    const res = await request(app)
      .get('/getHospitalsBySeverity')
      .query({ severityId: 10 })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toHaveProperty('error');
  });

  it('should return an array of hospital objects with the waitlist filtered to contain only the severity equal to severityId or above', async () => {
    const res = await request(app)
      .get('/getHospitalsBySeverity')
      .query({ severityId: 1 })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty('hospitals');
    expect(JSON.parse(res.text).hospitals.length).toBe(23);
  });
});

describe('Test getPatient', () => {
  it('should return 404 if no patient id was given', async () => {
    const res = await request(app)
      .get('/getPatient')
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toHaveProperty('error');
    expect(JSON.parse(res.text).error).toBe('Invalid Patient ID');
  });

  it('should return 404 if patient id does not exist in the DB', async () => {
    const res = await request(app)
      .get('/getPatient')
      .query({ userId: '75174942-9416-45b6-0000-74b74890c7ca' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toHaveProperty('error');
    expect(JSON.parse(res.text).error).toBe('Patient not found');
  });

  it('should return a patient object with a valid userId', async () => {
    const res = await request(app)
      .get('/getPatient')
      .query({ userId: '75174942-9416-45b6-93db-74b74890c7ca' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty('patient');
    expect(JSON.parse(res.text).patient).toHaveProperty('firstName');
    expect(JSON.parse(res.text).patient).toHaveProperty('lastName');
  });
});

describe('Test postPatientForm', () => {
  it('should 404 if post does not contain details of the patient', async () => {
    const res = await request(app)
      .post('/postPatientForm')
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toHaveProperty('error');
  });

  it('should 404 if post does not all the details of the patient', async () => {
    const res = await request(app)
      .post('/postPatientForm')
      .send({
        firstName: 'Greg',
        lastName: 'Hu',
        illness: { name: 'Intense Intolerance', id: 5 }
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(JSON.parse(res.text)).toHaveProperty('error');
  });

  it('should return a patient id if post contains all detail of the patient', async () => {
    const res = await request(app)
      .post('/postPatientForm')
      .send({
        firstName: 'Greg',
        lastName: 'Hu',
        illness: { name: 'Intense Intolerance', id: 5 },
        severity: 2,
        hospital: { totalWaitTime: 5.2, id: 3 }
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty('userId');
  });
});

describe('Test calculateWaitingTime', () => {
  it('should give use a sum in hours given valid waitingList', () => {
    const waitingList = [
      { averageProcessTime: 30, patientCount: 5 },
      { averageProcessTime: 5, patientCount: 1 },
      { averageProcessTime: 40, patientCount: 3 },
      { averageProcessTime: 10, patientCount: 7 }
    ];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((5.75).toFixed(2));
  });

  it('should return 0 if given empty array', () => {
    const waitingList = [];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((0).toFixed(2));
  });

  it('should return 0 if given empty array', () => {
    const waitingList = null;
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((0).toFixed(2));
  });

  it('should skip over corrupted patientCount data and return a sum of valid data', () => {
    const waitingList = [{ averageProcessTime: 30, patientCount: 5 }, { averageProcessTime: 5 }];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((2.5).toFixed(2));
  });

  it('should skip over corrupted averageProcessTime data and return a sum of valid data', () => {
    const waitingList = [{ averageProcessTime: 30, patientCount: 5 }, { patientCount: 5 }];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((2.5).toFixed(2));
  });

  it('should skip over corrupted data and return a sum of valid data', () => {
    const waitingList = [{ averageProcessTime: 30, patientCount: 5 }, {}];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((2.5).toFixed(2));
  });
});
