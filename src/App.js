import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import HospitalsOverview from './components/HospitalsOverview/HospitalsOverview';
import Patient from './components/Patient/Patient';
import Patients from './components/Patients/Patients';
import Page404 from './components/Page404/Page404';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Header history={history} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/hospitalsOverview' component={HospitalsOverview} />
        <Route exact path='/patients' component={Patients} />
        <Route exact path='/patient/:id' component={Patient} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
