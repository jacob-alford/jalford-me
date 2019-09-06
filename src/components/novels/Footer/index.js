import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
