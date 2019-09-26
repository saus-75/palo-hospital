import styled from 'styled-components';
import { Pane, Table } from 'evergreen-ui';

const TablePane = styled(Pane)`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const TableCell = styled(Table.Cell)`
  justify-content: center;
  text-align: center;
`;

export default {
  TablePane,
  TableCell
};
