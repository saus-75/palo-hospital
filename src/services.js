const headers = { 'Content-Type': 'application/json' };

const createLocationLink = ({ lat, lng }) => {
  const G_MAPS = 'https://www.google.com/maps';
  return `${G_MAPS}/place/${lat},${lng}/@${lat},${lng},18z`;
};

const getRequest = async ({ link }) => {
  return await fetch(link, { method: 'GET', headers });
};

const postRequest = async ({ link, body }) => {
  return await fetch(link, { method: 'POST', body, headers });
};

export default {
  createLocationLink,
  getRequest,
  postRequest
};
