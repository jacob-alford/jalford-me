import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { AppBar, Toolbar, Typography,
         Button, Paper, Grid, Breadcrumbs,
         Link, IconButton, Menu, MenuItem,
         ListItemText, ListItemIcon, Fade
       } from '@material-ui/core/';

import { NavigateNext,
         AccountCircle,
         Group,
         Lock,
         ListAlt,
         Eject
       } from '@material-ui/icons/';

import LoginDialogue from '../../sentences/LoginDialogue';
import SignupDialogue from '../../sentences/SignupDialogue';
import BlogBarActions from '../../sentences/BlogBarActions';

import { firebase } from '../../../index.js';

import withUser from '../../bindings/wrappers/withUser';

const styles = {
  bar:{
    position:'fixed',
    top:'calc(100% - 64px)'
  },
  breadcrumbs:{
    color:'white'
  }
}

const defaultBreadcrumbs = [
  {label:"Posts",url:"/posts"},
  // {label:"Philosophy",url:"/view/philosophy"},
  // {label:"0",url:"/view/philosophy/0"}
];

const getUserPermissions = user => user.activeUser.permissions.value;

function BlogBar(props){
  const [signInIsOpen,setSignInIsOpen] = useState(false);
  const [signUpIsOpen,setSignUpIsOpen] = useState(false);
  const openSignIn = () => setSignInIsOpen(true);
  const openSignUp = () => setSignUpIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);
  const closeSignUp = () => setSignUpIsOpen(false);
  const [userMenuAnchor,setUserMenuAnchor] = useState(null);
  const { user , headerIsOpen , history , links=defaultBreadcrumbs } = props;
  const handleLinkRedirect = url => {
    if(url.includes("http")) window.location.href = url;
    else history.push(url);
  }
  const handleMenuAnchor = evt => {
    setUserMenuAnchor(evt.currentTarget);
  }
  const handleSignout = () => {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out");
      setUserMenuAnchor(null);
    }).catch(function(error) {
      console.error("Failed to sign out!  Reason:",error.toString());
    });
  }
  const closeUserMenu = () => setUserMenuAnchor(null);
  useEffect(() => {
    if(user.loggedIn && signInIsOpen)
      closeSignIn();
    if(user.loggedIn && signUpIsOpen)
      closeSignUp();
  },[user]);
  return (
      <React.Fragment>
        <AppBar style={styles.bar}>
          <Toolbar>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Breadcrumbs style={{flexGrow:"1"}} separator={<NavigateNext style={styles.breadcrumbs} fontSize="small" />}>
                  {links.map((link,index) => (
                    <Link style={styles.breadcrumbs} color="inherit" href={link.url} onClick={() => handleLinkRedirect(link.url)}>
                      <Typography variant="h6">
                        {link.label}
                      </Typography>
                    </Link>
                  ))}
                </Breadcrumbs>
              </Grid>
              {(user.loggedIn) ? (
                <React.Fragment>
                    <Grid item>
                      <BlogBarActions user={user} context="inBlog"/>
                    </Grid>
                    <Grid item>
                      <Fade in={user.loggedIn === true} timeout={1500}>
                        <Grid container direction="row" alignItems="center">
                          <Grid item>
                            <Typography variant="body2">
                              Welcome, {user.activeUser.username}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={handleMenuAnchor} color="inherit">
                              <AccountCircle/>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Fade>
                    </Grid>
                  </React.Fragment>
              ) : (
                <Fade in={user.loggedIn === false}>
                  <Grid item>
                    <Button color="inherit" onClick={openSignIn}>Login</Button>
                    <Button color="inherit" onClick={openSignUp}>Signup</Button>
                  </Grid>
                </Fade>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
        <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={closeUserMenu}>
          <MenuItem>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </MenuItem>
          {(getUserPermissions(user) >= 8) ? (
            <MenuItem>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText
                primary={`Manage${([8,9].includes(getUserPermissions(user))) ? " My " : " "}Posts`} />
            </MenuItem>
          ) : null}
          {(getUserPermissions(user) === 10) ? (
            <MenuItem>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </MenuItem>
          ) : null}
          <MenuItem onClick={handleSignout}>
            <ListItemIcon>
              <Eject />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        </Menu>
        <LoginDialogue signInIsOpen={signInIsOpen} setSignInIsOpen={setSignInIsOpen}/>
        <SignupDialogue signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen} />
      </React.Fragment>
  );
}

export default withRouter(withUser(BlogBar));
