import styled from 'styled-components';
import { Pane, Heading, Text } from 'evergreen-ui';

const CardList = styled(Pane)`
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
  padding: 0px 10px;
  align-items: center;
  justify-content: flex-start;
`;

const CardPane = styled(Pane)`
  width: 200px;
  height: 200px;
  margin: 40px;
  border-radius: 12px;
  text-decoration: none;
  background-color: #f3f3f3;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  :hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CardBody = styled(Pane)`
  flex: 1;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const CardHeading = styled(Heading)`
  word-wrap: break-word;
  line-height: 1.2em;
  margin-bottom: 5px;
`;

const CardText = styled(Text)`
  word-wrap: break-word;
  line-height: 1.2em;
  margin-bottom: 5px;
`;

export default {
  CardList,
  CardPane,
  CardBody,
  CardHeading,
  CardText
};
