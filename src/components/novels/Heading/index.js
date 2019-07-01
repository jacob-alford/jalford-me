import React from 'react';
import { withRouter } from "react-router";
import { Grid } from '@material-ui/core/';

import Header from '../../paragraphs/Header';

import { StyledHeading } from './style.js';

function Heading(props){
  const { location , history } = props;
  return (
    <StyledHeading>
      <Grid container justify="center" alignContent="center" className="container">
        <Grid item>
          <Header history={history} path={location.pathname}/>
        </Grid>
      </Grid>
    </StyledHeading>
  );
}

// Supplies the history object to navigation
export default withRouter(Heading);
