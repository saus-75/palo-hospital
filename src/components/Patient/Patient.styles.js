import styled from 'styled-components';
import { Pane, Heading } from 'evergreen-ui';

const PatientPane = styled(Pane)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

const PatientDetail = styled(Heading)`
  margin: 10px;
`;

export default {
  PatientPane,
  PatientDetail
};
