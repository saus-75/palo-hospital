const headers = { 'Content-Type': 'application/json' };

const createLocationLink = ({ lat, lng }) => {
  const G_MAPS = 'https://www.google.com/maps/place';
  return `${G_MAPS}/${lat},${lng}/@${lat},${lng},18z`;
};

const getRequest = async ({ link }) => {
  const request = await fetch(link, { method: 'GET', headers });
  return await request.json();
};

const postRequest = async ({ link, body }) => {
  const request = await fetch(link, { method: 'POST', body, headers });
  return await request.json();
};

export default {
  createLocationLink,
  getRequest,
  postRequest
};
