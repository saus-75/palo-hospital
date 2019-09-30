const headers = { 'Content-Type': 'application/json' };

const createLocationLink = ({ lat, lng }) => {
  const G_MAPS = 'https://www.google.com/maps/place';
  if (lat && lng) {
    return `${G_MAPS}/${lat},${lng}/@${lat},${lng},18z`;
  } else {
    throw new Error('Invalid Latitude and Longitude');
  }
};

const getRequest = async ({ link }) => {
  try {
    const request = await fetch(link, { method: 'GET', headers });
    if (request.status === 200) {
      return await request.json();
    } else {
      throw new Error('GET Request Failed');
    }
  } catch (error) {
    throw new Error('GET Request Failed');
  }
};

const postRequest = async ({ link, body }) => {
  try {
    const request = await fetch(link, { method: 'POST', body, headers });
    if (request.status === 200) {
      return await request.json();
    } else {
      throw new Error('POST Request Failed');
    }
  } catch (error) {
    throw new Error('POST Request Failed');
  }
};

export default {
  createLocationLink,
  getRequest,
  postRequest
};
