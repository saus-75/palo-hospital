import React, { useState, useEffect } from 'react';
import { Table, Icon, toaster, Spinner } from 'evergreen-ui';
import queries from '../../queries';
import services from '../../services';

import HospitalsOverviewStyles from './HospitalsOverview.styles';

const { getAllHospitals } = queries;
const { createLocationLink } = services;
const { TablePane, TableCell } = HospitalsOverviewStyles;

const HospitalsOverview = () => {
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllHospitals();
        const { hospitals } = response;

        const locatedHospitals = hospitals.map(hospital => {
          const {
            location: { lat, lng }
          } = hospital;
          return { ...hospital, locationLink: createLocationLink({ lat, lng }) };
        });
        setHospitals(locatedHospitals.sort((a, b) => a.totalWaitTime - b.totalWaitTime));
      } catch (error) {
        toaster.danger('Error retrieving hospital list');
      }
    };
    fetchData();
    return () => {
      setHospitals(null);
    };
  }, []);

  return (
    <TablePane>
      {hospitals ? (
        <Table>
          <Table.Head>
            <TableCell flex={1}>Hospital Name</TableCell>
            <TableCell flex={1}>Wait Time (Hours)</TableCell>
            <TableCell flex={3}>Location</TableCell>
          </Table.Head>
          <Table.Body>
            {hospitals &&
              hospitals.map(hospital => {
                const {
                  id,
                  name,
                  totalWaitTime,
                  location: { lat, lng },
                  locationLink
                } = hospital;
                return (
                  <Table.Row padding='5px' height='auto' textAlign='center' key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{totalWaitTime} hr</TableCell>
                    <TableCell>x: {lat}</TableCell>
                    <TableCell>y: {lng}</TableCell>
                    <TableCell>
                      <a href={locationLink}>
                        <Icon align-self='end' icon='geolocation' />
                      </a>
                    </TableCell>
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

export default HospitalsOverview;
