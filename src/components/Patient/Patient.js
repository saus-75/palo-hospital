import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { toaster, Link } from 'evergreen-ui';
import queries from '../../queries';
import services from '../../services';
import PatientStyles from './Patient.styles';

const { getPatient } = queries;
const { createLocationLink } = services;
const { PatientPane, PatientDetail } = PatientStyles;

const Patient = ({ match }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatient({ userId: match.params.id });
        const { patient } = response;
        if (patient !== {}) {
          setPatient(patient);
        } else {
          toaster.danger('Patient Not Found');
        }
      } catch (error) {
        toaster.danger('Error retrieving patient');
      }
    };
    fetchData();
    return () => {
      setPatient(null);
    };
  }, [match]);

  return (
    <PatientPane>
      {!patient || patient === {} ? (
        <PatientDetail size={900} color='#46d19a'>
          Patient Not Found!
        </PatientDetail>
      ) : (
        <Fragment>
          <PatientDetail size={900}>{`${patient.firstName} ${patient.lastName}`}</PatientDetail>
          <PatientDetail size={600}>{`Illness: ${patient.illness.name}`}</PatientDetail>
          <PatientDetail size={600}>{`Severity: ${patient.severity.label}`}</PatientDetail>
          <Link
            color='green'
            href={createLocationLink({ lat: patient.hospital.location.lat, lng: patient.hospital.location.lng })}
          >
            <PatientDetail size={600}>{`Hospital: ${patient.hospital.name}`}</PatientDetail>
          </Link>
          <PatientDetail size={600}>{`Wait Time: ~${patient.totalWaitTime} hours`}</PatientDetail>
        </Fragment>
      )}
    </PatientPane>
  );
};

export default withRouter(Patient);
