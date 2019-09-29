import services from './services';

const { getRequest, postRequest } = services;

const getAllHospitals = async () => {
  return await getRequest({ link: '/getAllHospitals' });
};

const getAllIllnesses = async () => {
  return await getRequest({ link: '/getAllIllnesses' });
};

const getAllSeverity = async () => {
  return await getRequest({ link: '/getAllSeverity' });
};

const getAllPatients = async () => {
  return await getRequest({ link: '/getAllPatients' });
};

const getHospitalsBySeverity = async ({ severityId }) => {
  return await getRequest({ link: `/getHospitalsBySeverity?severityId=${severityId}` });
};

const getPatient = async ({ userId }) => {
  return await getRequest({ link: `/getPatient?userId=${userId}` });
};

const postPatientForm = async ({ formData }) => {
  return await postRequest({ link: '/postPatientForm', body: JSON.stringify(formData) });
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
