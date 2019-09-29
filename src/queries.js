import services from './services';

const { getRequest, postRequest } = services;

const getAllHospitals = async () => {
  const request = await getRequest({ link: '/getAllHospitals' });
  const list = await request.json();
  return list;
};

const getAllIllnesses = async () => {
  const request = await getRequest({ link: '/getAllIllnesses' });
  const list = await request.json();
  return list;
};

const getAllSeverity = async () => {
  const request = await getRequest({ link: '/getAllSeverity' });
  const list = await request.json();
  return list;
};

const getAllPatients = async () => {
  const request = await getRequest({ link: '/getAllPatients' });
  const list = await request.json();
  return list;
};

const getHospitalsBySeverity = async ({ severityId }) => {
  const request = await getRequest({ link: `/getHospitalsBySeverity?severityId=${severityId}` });
  const list = await request.json();
  return list;
};

const getPatient = async ({ userId }) => {
  const request = await getRequest({ link: `/getPatient?userId=${userId}` });
  const list = await request.json();
  return list;
};

const postPatientForm = async ({ formData }) => {
  const request = await postRequest({ link: '/postPatientForm', body: JSON.stringify(formData) });
  const list = await request.json();
  return list;
};

export default {
  getAllHospitals,
  getAllIllnesses,
  getAllSeverity,
  getAllPatients,
  getHospitalsBySeverity,
  getPatient,
  postPatientForm
};
