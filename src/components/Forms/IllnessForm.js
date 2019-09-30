import React, { useState, useEffect, Fragment } from 'react';
import { Pane, FormField, Combobox, SegmentedControl, toaster, TextInputField } from 'evergreen-ui';
import { withRouter } from 'react-router';
import * as yup from 'yup';

import queries from '../../queries';
import HospitalListForm from './HospitalListForm';
import FormsConstants from './Forms.constants';

const { getAllIllnesses, getAllSeverity, getHospitalsBySeverity, postPatientForm } = queries;
const { labels } = FormsConstants;

const IllnessForm = ({ history }) => {
  const [illnesses, setIllnesses] = useState(null);
  const [severities, setSeverities] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [illness, setIllness] = useState(null);
  const [severity, setSeverity] = useState(0);
  const [errors, setErrors] = useState({});

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
        setHospitals(hospitals.sort((a, b) => a.totalWaitTime - b.totalWaitTime));
      } catch (error) {
        toaster.danger('Error retrieving hospitals');
      }
    };
    if (severity !== null && severity !== undefined) {
      fetchData();
    }
    return () => {
      setHospitals(null);
    };
  }, [severity]);

  const validateData = () => {
    const schema = yup.object().shape({
      firstName: yup.string().required(labels.firstNameIsRequired),
      lastName: yup.string().required(labels.lastNameIsRequired),
      illness: yup.object().shape({ name: yup.string(), id: yup.number() }),
      severity: yup
        .number()
        .min(0)
        .max(4)
    });

    try {
      schema.validateSync(
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          severity: severity
        },
        { abortEarly: false, returnError: true }
      );
    } catch (error) {
      if (error.name === 'ValidationError' && error.errors.length > 0) {
        const newErrors = {};
        error.inner.forEach(fieldError => {
          newErrors[fieldError.path] = fieldError.message;
        });
        setErrors(newErrors);
        return false;
      }
    }
    return true;
  };

  const handleFirstName = event => {
    const { value } = event.target;
    if (!value) {
      setIllness(null);
      setSeverity(null);
      setHospitals(null);
    }
    setFirstName(value);
  };

  const handleLastName = event => {
    const { value } = event.target;
    if (!value) {
      setIllness(null);
      setSeverity(null);
      setHospitals(null);
    }
    setLastName(value);
  };

  const handleIllnessSelection = selected => {
    if (!selected) {
      setSeverity(null);
      setHospitals(null);
    }
    setIllness(selected);
  };

  const handleSeveritySelection = selected => {
    setSeverity(selected);
  };

  const submitForm = async hospital => {
    const formData = {
      firstName,
      lastName,
      illness,
      severity,
      hospital
    };
    const isValid = validateData();
    if (!isValid) return;

    try {
      const result = await postPatientForm({ formData });
      const { userId } = result;
      history.push(`/patient/${userId}`);
    } catch (error) {
      toaster.danger('Cannot submit form data!');
    }
  };

  return (
    <Fragment>
      <Pane margin='10px' width='60%' display='flex'>
        <TextInputField
          label='First Name'
          marginRight='15px'
          width='50%'
          disabled={!illnesses}
          onChange={handleFirstName}
          isInvalid={Boolean(errors.firstName)}
          validationMessage={errors.firstName}
        />
        <TextInputField
          label='Last Name'
          marginRight='15px'
          width='50%'
          disabled={!illnesses}
          onChange={handleLastName}
          isInvalid={Boolean(errors.lastName)}
          validationMessage={errors.lastName}
        />
      </Pane>
      {firstName && lastName && (
        <FormField margin='15px' label='Select an Illness'>
          <Combobox
            openOnFocus
            placeholder='Illnesses'
            items={illnesses || []}
            itemToString={item => (item ? item.name : '')}
            onChange={handleIllnessSelection}
            disabled={!illnesses}
            isInvalid={Boolean(errors.illness)}
            validationMessage={errors.illness}
          />
        </FormField>
      )}
      {illness && severities && (
        <FormField margin='15px' width='100%' label='Rate the severity of the Illness'>
          <SegmentedControl options={severities} defaultValue={0} value={severity} onChange={handleSeveritySelection} />
        </FormField>
      )}
      {illness && (severity !== null && severity !== undefined) && hospitals ? (
        <FormField margin='15px' width='100%' label='Select a Hospital To Get Direction'>
          <HospitalListForm hospitals={hospitals} submitForm={submitForm} />
        </FormField>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default withRouter(IllnessForm);
