import React from 'react';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

import Heading from './components/novels/Heading';
import Footing from './components/novels/Footer';
import About from './components/novels/About';
import Home from './components/novels/Home';
import Blog from './components/novels/Blog';

import { StyledApp } from './theme';

require('typeface-roboto');

function App() {
  return (
    <StyledApp>
      <Router>
        <Heading />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/" component={Home} />
        </Switch>
        <Footing />
      </Router>
    </StyledApp>
  );
}

export default App;
