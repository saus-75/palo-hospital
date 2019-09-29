const fetch = require('node-fetch');

const retrieveHospitalList = async link => {
  try {
    const response = await fetch(link);
    const list = await response.json();

    let hospitals = list._embedded.hospitals;

    if (list._links.next) {
      const { href } = list._links.next;
      hospitals.push(...(await retrieveHospitalList(href)));
    }
    return hospitals;
  } catch (error) {
    console.error(error);
  }
};

const retrieveIllnessList = async link => {
  try {
    const response = await fetch(link);
    const list = await response.json();

    let illnesses = list._embedded.illnesses.map(illness => illness.illness);

    if (list._links.next) {
      const { href } = list._links.next;
      illnesses.push(...(await retrieveIllnessList(href)));
    }
    return illnesses;
  } catch (error) {
    console.error(error);
  }
};

const calculateWaitingTime = waitingList => {
  return (waitingList.reduce((a, b) => a + +b.averageProcessTime * b.patientCount, 0) / 60).toFixed(2);
};

module.exports = {
  retrieveHospitalList,
  retrieveIllnessList,
  calculateWaitingTime
};
