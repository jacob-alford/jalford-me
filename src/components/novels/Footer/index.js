import React from 'react';
import { Typography , Container } from '@material-ui/core/';

import { StyledFooter } from './style.js';

import { footerText } from '../../../config';

export default function Footer(props){
  return (
    <StyledFooter>
      <Container>
        <Typography style={{color:"white"}} variant="body1" className="footer">
          {footerText}
        </Typography>
      </Container>
    </StyledFooter>
  );
}
