import React from 'react';
import { Container } from '@material-ui/core/';

import Header from '../../paragraphs/Header';

import { StyledHeading } from './style.js';

export default function Heading(props){
  return (
    <StyledHeading>
      <Container className="container">
          <Header />
      </Container>
    </StyledHeading>
  );
}
