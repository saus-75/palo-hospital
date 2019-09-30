import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './Header/Header';
import Home from './Home/Home';
import HospitalsOverview from './HospitalsOverview/HospitalsOverview';
import Patient from './Patient/Patient';
import Patients from './Patients/Patients';
import Page404 from './Page404/Page404';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Header history={history} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/hospitals' component={HospitalsOverview} />
        <Route exact path='/patients' component={Patients} />
        <Route exact path='/patient/:id' component={Patient} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
