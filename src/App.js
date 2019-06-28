import React from 'react';

import Heading from './components/novels/Heading';

import { StyledApp } from './theme';

require('typeface-roboto');

function App() {
  return (
    <StyledApp className="app">
      <Heading />
    </StyledApp>
  );
}

export default App;
