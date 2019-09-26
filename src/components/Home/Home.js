import React from 'react';
import { Heading } from 'evergreen-ui';
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
        <IllnessForm />
      </FormPane>
    </HomePane>
  );
};

export default Home;
