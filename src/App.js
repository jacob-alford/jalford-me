import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Heading from './components/novels/Heading';
import Footer from './components/novels/Footer';
import About from './components/novels/About';
import Home from './components/novels/Home';

import { StyledApp } from './theme';

require('typeface-roboto');

function App() {
  return (
    <StyledApp>
      <Router>
        <Heading path={window.location.pathname} />
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Footer />
      </Router>
    </StyledApp>
  );
}

export default App;
