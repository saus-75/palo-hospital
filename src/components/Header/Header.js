import React from 'react';
import { withRouter } from 'react-router';
import { Tab } from 'evergreen-ui';
import HeaderStyles from './Header.styles';

const { HeaderPane, HeaderTablist } = HeaderStyles;

const Header = ({ history }) => {
  return (
    <HeaderPane>
      <HeaderTablist>
        <Tab padding='15px' color='#f3f3f3' size={500} onSelect={() => history.push('/')}>
          Home
        </Tab>
        <Tab padding='15px' color='#f3f3f3' size={500} onSelect={() => history.push('/hospitalsOverview')}>
          Hospitals
        </Tab>
        <Tab padding='15px' color='#f3f3f3' size={500} onSelect={() => history.push('/patients')}>
          Patients
        </Tab>
      </HeaderTablist>
    </HeaderPane>
  );
};

export default withRouter(Header);
