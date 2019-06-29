import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Heading from './components/novels/Heading';
import About from './components/novels/About';

import { StyledApp } from './theme';

require('typeface-roboto');

function App() {
  return (
    <StyledApp className="app">
      <Router>
        <Heading />
        <Route path="/about" component={About} />
      </Router>
    </StyledApp>
  );
}

export default App;
