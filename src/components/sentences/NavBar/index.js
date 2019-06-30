import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core/';

import NavItem from '../../words/NavItem';

import { StyledNavBar } from './style.js';

import { getActiveNavItem } from '../../../functions';

export default function NavBar(props){
  const { navList , path } = props;
  const [activeNavItem, setActiveNavItem] = useState(getActiveNavItem(path));
  return (
    <StyledNavBar>
      <Grid container direction="row" justify="center" spacing={4}>
        {navList.map((navItem,index) => (
          <Grid item key={`navItem#${index}`}>
            <NavItem
              active={(activeNavItem === index) ? 1 : 0}
              text={navItem.text}
              url={navItem.url}
              onClick={() => setActiveNavItem(index)} />
          </Grid>
        ))}
      </Grid>
    </StyledNavBar>
  );
}

NavBar.propTypes = {
  navList:PropTypes.arrayOf(PropTypes.shape({
    text:PropTypes.string.isRequired,
    url:PropTypes.string
  }))
}
