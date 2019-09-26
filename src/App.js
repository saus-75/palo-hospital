import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import HospitalsOverview from './components/HospitalsOverview/HospitalsOverview';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Header history={history} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/hospitalsOverview' component={HospitalsOverview} />
      </Switch>
    </Router>
  );
};

export default App;
