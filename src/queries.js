import services from './services';

const { getRequest, postRequest } = services;

const getAllHospitals = async () => {
  return await getRequest({ link: '/hospitals' });
};

const getAllIllnesses = async () => {
  return await getRequest({ link: '/illnesses' });
};

const getAllSeverity = async () => {
  return await getRequest({ link: '/severity' });
};

const getAllPatients = async () => {
  return await getRequest({ link: '/patients' });
};

const getHospitalsBySeverity = async ({ severityId }) => {
  return await getRequest({ link: `/hospitalBySeverity?severityId=${severityId}` });
};

const getPatient = async ({ userId }) => {
  return await getRequest({ link: `/patient?userId=${userId}` });
};

const postPatientForm = async ({ formData }) => {
  return await postRequest({ link: '/patientForm', body: JSON.stringify(formData) });
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
