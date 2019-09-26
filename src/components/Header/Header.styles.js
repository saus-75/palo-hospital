import styled from 'styled-components';
import { Pane, Tablist } from 'evergreen-ui';

const HeaderPane = styled(Pane)`
  background: #46d19a;
  border-bottom: 1px solid grey;
  margin-bottom: 20px;
`;

const HeaderTablist = styled(Tablist)`
  margin-right: 24;
  flex-basis: 240;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export default {
  HeaderPane,
  HeaderTablist
};
