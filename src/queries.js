const headers = { 'Content-Type': 'application/json' };

const getAllHospitals = async () => {
  const request = await fetch('/getAllHospitals', {
    method: 'GET',
    headers: headers
  });
  const list = await request.json();
  return list;
};

const getAllIllnesses = async () => {
  const request = await fetch('/getAllIllnesses', {
    method: 'GET',
    headers: headers
  });
  const list = await request.json();
  return list;
};

const getAllSeverity = async () => {
  const request = await fetch('/getAllSeverity', {
    method: 'GET',
    headers: headers
  });
  const list = await request.json();
  return list;
};

const getHospitalsBySeverity = async ({ severityId }) => {
  const request = await fetch(`/getHospitalsBySeverity?severityId=${severityId}`, {
    method: 'GET',
    headers: headers
  });
  const list = await request.json();
  return list;
};

export default {
  getAllHospitals,
  getAllIllnesses,
  getAllSeverity,
  getHospitalsBySeverity
};
