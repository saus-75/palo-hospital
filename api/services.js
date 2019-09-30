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
    return error;
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
    return error;
  }
};

const calculateWaitingTime = waitingList => {
  if (waitingList) {
    return (
      waitingList.reduce((a, b) => {
        if (b.averageProcessTime && b.patientCount) {
          return a + +b.averageProcessTime * b.patientCount;
        }
        return a + +0;
      }, 0) / 60
    ).toFixed(2);
  }
  return (0).toFixed(2);
};

module.exports = {
  retrieveHospitalList,
  retrieveIllnessList,
  calculateWaitingTime
};
