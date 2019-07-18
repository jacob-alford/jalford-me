import React, { useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core/';

import NavItem from '../../words/NavItem';

import { StyledNavBar } from './style.js';

import { getActiveNavItem } from '../../../functions';

function NavBar(props){
  const { navList , location , history } = props;
  const handleClick = (index,url) => {
    if(url.includes("http")) window.location.href = url;
    else history.push(url);
  }
  return (
    <StyledNavBar>
      <Grid className="navBar" container direction="row" justify="center" spacing={4}>
        {navList.map((navItem,index) => (
          <Grid item key={`navItem#${index}`}>
            <NavItem
              active={(getActiveNavItem(location.pathname) === index) ? 1 : 0}
              text={navItem.text}
              url={navItem.url}
              onClick={() => handleClick(index,navItem.url)} />
          </Grid>
        ))}
      </Grid>
    </StyledNavBar>
  );
}

export default withRouter(NavBar);

NavBar.propTypes = {
  navList:PropTypes.arrayOf(PropTypes.shape({
    text:PropTypes.string.isRequired,
    url:PropTypes.string
  }))
}
