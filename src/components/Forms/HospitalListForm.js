import React from 'react';
import Forms from './Forms.styles';

const { CardList, CardPane, CardBody, CardHeading, CardText } = Forms;

const HospitalListForm = ({ hospitals, submitForm }) => {
  const handleCardClick = (event, hospital) => {
    event.preventDefault();
    submitForm(hospital);
  };
  return (
    <CardList>
      {hospitals
        ? hospitals.map(hospital => {
            const { id, name, totalWaitTime, filteredWaitingList } = hospital;
            return (
              <CardPane key={id} onClick={event => handleCardClick(event, hospital)}>
                <CardBody>
                  <CardHeading>{name}</CardHeading>
                  <CardText>{`Wait Time: ${totalWaitTime} hours`}</CardText>
                  <CardText>{`Total Patients: ${filteredWaitingList.reduce(
                    (a, b) => a + +b.patientCount,
                    0
                  )}`}</CardText>
                </CardBody>
              </CardPane>
            );
          })
        : ''}
    </CardList>
  );
};

export default HospitalListForm;
