import React from 'react';
import { Typography } from '@material-ui/core/';

import NavBar from '../../sentences/NavBar';

import { StyledHeader } from './style.js';

import { navItems } from '../../../config';

export default function Header(props){
  const { path , history , style } = props;
  return (
    <StyledHeader style={style}>
      <Typography className="title" variant="h1">
        Jacob Alford
      </Typography>
      <NavBar history={history} navList={navItems} path={path}/>
    </StyledHeader>
  );
}
