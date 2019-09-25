import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './app/Header';
import Home from './app/Home';
import Planet from './app/Planet';
import About from './app/About';
import Contact from './app/Contact';

import './css/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/planet" component={Planet} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
