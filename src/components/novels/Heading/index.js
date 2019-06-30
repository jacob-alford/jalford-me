import React from 'react';
import { Grid } from '@material-ui/core/';

import Header from '../../paragraphs/Header';

import { StyledHeading } from './style.js';

export default function Heading(props){
  const { path } = props;
  return (
    <StyledHeading>
      <Grid container justify="center" alignContent="center" className="container">
        <Grid item>
          <Header path={path}/>
        </Grid>
      </Grid>
    </StyledHeading>
  );
}
