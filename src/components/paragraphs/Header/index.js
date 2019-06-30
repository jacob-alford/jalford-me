import React from 'react';
import { Typography } from '@material-ui/core/';

import NavBar from '../../sentences/NavBar';

import { StyledHeader } from './style.js';

import { navItems } from '../../../config';

export default function Header(props){
  const { path } = props;
  return (
    <StyledHeader>
      <Typography className="title" variant="h1">
        Jacob Alford
      </Typography>
      <NavBar navList={navItems} path={path}/>
    </StyledHeader>
  );
}
