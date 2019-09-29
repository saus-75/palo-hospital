import React, { useState, useEffect } from 'react';
import { Table, toaster, Spinner } from 'evergreen-ui';
import queries from '../../queries';

import PatientsStyles from './Patients.styles';

const { getAllPatients } = queries;
const { TablePane, TableCell } = PatientsStyles;

const Patients = () => {
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPatients();
        const { patients } = response;
        setPatients(patients.sort((a, b) => b.severity - a.severity));
      } catch (error) {
        toaster.danger('Error retrieving patients list');
      }
    };
    fetchData();
    return () => {
      setPatients(null);
    };
  }, []);

  return (
    <TablePane>
      {patients ? (
        <Table>
          <Table.Head>
            <TableCell>Patient ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Illness</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Hospital</TableCell>
          </Table.Head>
          <Table.Body>
            {patients &&
              patients.map(patient => {
                const { id, firstName, lastName, illness, severity, hospital } = patient;
                return (
                  <Table.Row padding='5px' height='auto' textAlign='center' key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{`${firstName} ${lastName}`}</TableCell>
                    <TableCell>{illness.name}</TableCell>
                    <TableCell>{severity}</TableCell>
                    <TableCell>{hospital}</TableCell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      ) : (
        <Spinner />
      )}
    </TablePane>
  );
};

export default Patients;
