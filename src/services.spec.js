import services from './services';
import fetch from 'jest-fetch-mock';

const { createLocationLink, getRequest, postRequest } = services;

describe('Test createLocationLink', () => {
  it('Should return valid link if lat & lng is given', () => {
    const lat = 193.43;
    const lng = -294.4;
    const G_MAPS = 'https://www.google.com/maps/place';

    const link = createLocationLink({ lat, lng });

    expect(link).toBe(`${G_MAPS}/${lat},${lng}/@${lat},${lng},18z`);
  });

  it('Should return error if given invalid lat or lng', () => {
    const lat = null;
    const lng = null;
    try {
      createLocationLink({ lat, lng });
    } catch (error) {
      expect(error.message).toBe('Invalid Latitude and Longitude');
    }
  });
});

describe('Test getRequest', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('Should return an object if given valid API endpint', async () => {
    const link = 'http://localhost:5000/hospitals';
    fetch.mockResponseOnce();
    const res = await getRequest({ link });
    expect(res).toHaveProperty('hospitals');
  });

  it('Should return an error if given an invalid API endpint', async () => {
    const link = 'http://localhost:5000/SomethingElse';
    fetch.mockResponseOnce();
    try {
      await getRequest({ link });
    } catch (error) {
      expect(error.message).toBe('GET Request Failed');
    }
  });
});

describe('Test postRequest', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('Should return an object if given valid API endpint', async () => {
    const link = 'http://localhost:5000/patientForm';
    const body = JSON.stringify({
      firstName: 'George',
      lastName: 'client',
      hospital: { totalWaitTime: 2.3, id: 3 },
      severity: 0,
      illness: { name: 'old age', id: 1 }
    });
    fetch.mockResponseOnce();
    try {
      const res = await postRequest({ link, body });
      expect(res).toHaveProperty('userId');
    } catch (error) {
      expect(error.message).not.toBe('POST Request Failed');
    }
  });

  it('Should return an error if given an invalid API endpint', async () => {
    const link = 'http://localhost:5000/SomethingElse';
    const body = JSON.stringify({});
    fetch.mockResponseOnce();
    try {
      await postRequest({ link, body });
    } catch (error) {
      expect(error.message).toBe('POST Request Failed');
    }
  });
});
