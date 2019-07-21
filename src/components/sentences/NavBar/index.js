import React, { useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Grid , Hidden , Menu , MenuItem } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';

import NavItem from '../../words/NavItem';

import { StyledNavBar } from './style.js';

import { getActiveNavItem } from '../../../functions';

function NavBar(props){
  const { navList , location , history } = props;
  const [mobileNavAnchor,setMobileNavAnchor] = useState(null);
  const handleMobileNavClose = evt => {
    setMobileNavAnchor(null);
  }
  const handleMobileNavOpen = evt => {
    setMobileNavAnchor(evt.currentTarget);
  }
  const handleClick = (index,url) => {
    if(url.includes("http")) window.location.href = url;
    else history.push(url);
    handleMobileNavClose();
  }
  return (
    <StyledNavBar>
      <Hidden only={["xs","sm"]}>
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
      </Hidden>
      <Hidden only={["md","lg","xl"]}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <MenuIcon onClick={handleMobileNavOpen}/>
          </Grid>
          <Grid item>
            <Menu style={{marginTop:'48px',marginLeft:'-69.515px'}} anchorOrigin={{horizontal:'center',vertical:'top'}} anchorEl={mobileNavAnchor} open={Boolean(mobileNavAnchor)} onClose={handleMobileNavClose}>
              {navList.map((navItem,index) => (
                <MenuItem
                   key={`mobileNavItem#${index}`}
                  onClick={() => handleClick(index,navItem.url)}
                  selected={getActiveNavItem(location.pathname) === index}
                  disabled={navItem.disabled}>
                  {navItem.text}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>

      </Hidden>
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
