import React, { useState, useEffect, Fragment } from 'react';
import { FormField, Combobox, SegmentedControl, toaster } from 'evergreen-ui';
import queries from '../../queries';

const { getAllIllnesses, getAllSeverity, getHospitalsBySeverity } = queries;

const IllnessForm = () => {
  const [illnesses, setIllnesses] = useState(null);
  const [severities, setSeverities] = useState(null);

  const [illness, setIllness] = useState(null);
  const [severity, setSeverity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllIllnesses();
        const { illnesses } = response;
        const sortedIllnesses = illnesses.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
        );
        setIllnesses(sortedIllnesses);
      } catch (error) {
        toaster.danger('Error retrieving illnesses');
      }
      try {
        const response = await getAllSeverity();
        const { severities } = response;
        setSeverities(severities);
      } catch (error) {
        toaster.danger('Error retrieving severity list');
      }
    };
    fetchData();
    return () => {
      setIllnesses(null);
      setSeverities(null);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHospitalsBySeverity({ severityId: severity });
        const { hospitals } = response;
        console.log(hospitals);
      } catch (error) {
        toaster.danger('Error retrieving illnesses');
      }
    };
    if (severity) {
      fetchData();
    }
    return () => {};
  }, [severity]);

  const handleIllnessSelection = selected => {
    console.log(selected);
    if (!selected) {
      setSeverity(null);
    }
    setIllness(selected);
  };

  const handleSeveritySelection = selected => {
    console.log(selected);
    setSeverity(selected);
  };

  return (
    <Fragment>
      <FormField margin='15px' label='Select an Illness'>
        <Combobox
          openOnFocus
          placeholder='Illnesses'
          items={illnesses || []}
          itemToString={item => (item ? item.name : '')}
          onChange={handleIllnessSelection}
          disabled={!illnesses}
        />
      </FormField>
      {illness && (
        <FormField margin='15px' width='100%' label='Rate the severity of your Illness'>
          <SegmentedControl options={severities} onChange={handleSeveritySelection} />
        </FormField>
      )}
      {/* { illness && severity && <HospitalList/>} */}
    </Fragment>
  );
};

export default IllnessForm;
