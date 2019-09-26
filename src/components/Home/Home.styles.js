import styled from 'styled-components';
import { Pane } from 'evergreen-ui';

const HomePane = styled(Pane)`
  display: flex;
  flex-direction: column;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const FormPane = styled(Pane)`
  display: flex;
  flex-direction: column;
  width: auto;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
`;

export default {
  HomePane,
  FormPane
};
