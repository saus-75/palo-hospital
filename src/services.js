const createLocationLink = ({ lat, lng }) => {
  const G_MAPS = 'https://www.google.com/maps';
  return `${G_MAPS}/place/${lat},${lng}/@${lat},${lng},18z`;
};

export default {
  createLocationLink
};
