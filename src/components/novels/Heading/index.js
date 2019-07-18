import React , { useState } from 'react';
import { withRouter } from "react-router";
import { Grid } from '@material-ui/core/';

import { KeyboardArrowUp , KeyboardArrowDown } from '@material-ui/icons';

import Header from '../../paragraphs/Header';

import { StyledHeading } from './style.js';

export default function Heading(props){
  const { location , headerIsOpen , setHeaderState } = props;
  return (
    <StyledHeading>
      {(headerIsOpen) ? <KeyboardArrowUp onClick={setHeaderState} className="hideButton" style={{color:"#20BDFF"}}/> : <KeyboardArrowDown onClick={setHeaderState} className="hideButton" style={{color:"#20BDFF"}} />}
      <Grid container justify="center" alignContent="center" className={`container ${(headerIsOpen) ? null : "hidden"}`}>
        <Grid item>
          <Header style={(headerIsOpen) ? null : {visibility:"hidden"}} />
        </Grid>
      </Grid>
    </StyledHeading>
  );
}
