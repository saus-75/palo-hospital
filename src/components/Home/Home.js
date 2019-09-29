import React from 'react';
import { Heading } from 'evergreen-ui';
import { withRouter } from 'react-router';
import HomeStyles from './Home.styles';
import IllnessForm from '../Forms/IllnessForm';

const { HomePane, FormPane } = HomeStyles;

const Home = ({ history }) => {
  return (
    <HomePane>
      <Heading margin='10px' color='#46d19a' size={900}>
        Palo.Hospital
      </Heading>
      <FormPane>
        <IllnessForm history={history} />
      </FormPane>
    </HomePane>
  );
};

export default withRouter(Home);
