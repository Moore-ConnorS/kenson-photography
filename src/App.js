import React, { Component } from 'react';
import './App.css';

import Router from './router/Router'
import Header from './components/header/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router />
      </div>
    );
  }
}

export default App;
