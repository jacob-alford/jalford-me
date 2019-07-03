import React , { useState } from 'react';
import { withRouter } from "react-router";
import { Grid } from '@material-ui/core/';

import { KeyboardArrowUp , KeyboardArrowDown } from '@material-ui/icons';

import Header from '../../paragraphs/Header';

import { StyledHeading } from './style.js';

function Heading(props){
  const { location , history , headerIsOpen , setHeaderState } = props;
  return (
    <StyledHeading>
      <div className="hideButton" onClick={setHeaderState}>
        {(headerIsOpen) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </div>
      <Grid container justify="center" alignContent="center" className={`container ${(headerIsOpen) ? null : "hidden"}`}>
        <Grid item>
          <Header style={(headerIsOpen) ? null : {visibility:"hidden"}} history={history} path={location.pathname}/>
        </Grid>
      </Grid>
    </StyledHeading>
  );
}

// Supplies the history object to navigation
export default withRouter(Heading);
