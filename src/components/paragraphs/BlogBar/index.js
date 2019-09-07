import React, { useState , useEffect } from 'react';
import useReactRouter from 'use-react-router';

import * as MUI_COMPONENTS from './mui.js';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import LoginDialogue from 'components/sentences/LoginDialogue';
import SignupDialogue from 'components/sentences/SignupDialogue';
import BlogBarActions from 'components/sentences/BlogBarActions';
import CreatePostDialogue from 'components/sentences/CreatePostDialogue';

import { firebase } from 'firebase.js';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useRHook from 'components/bindings/hooks/useRHook';
import useNotify from 'components/bindings/hooks/useNotify';

import { getTextColorBasedOnBg } from 'functions';

const {
  AppBar, Toolbar, Typography,
  Button, Grid, IconButton, Menu, MenuItem,
  ListItemText, ListItemIcon, Fade, Slide,
  AccountCircle, Group, Lock, ListAlt, Eject
} = MUI_COMPONENTS;

const styles = {
  bar:{
    position:'fixed',
    top:'calc(100% - 64px)',
    transition:'background-color .25s'
  }
}

const getUserPermissions = user => user.activeUser.permissions.value;

export default function BlogBar(props){
  const { user } = useRHook();
  const scrollTrigger = useScrollTrigger();
  const notify = useNotify({
    timeout:4500
  });
  const screenTooSmall = useMediaQuery('(max-width:500px)');
  const [signInIsOpen,setSignInIsOpen] = useState(false);
  const [signUpIsOpen,setSignUpIsOpen] = useState(false);
  const [createPostIsOpen,setCreatePostIsOpen] = useState(false);
  const openSignIn = () => setSignInIsOpen(true);
  const openSignUp = () => setSignUpIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);
  const closeSignUp = () => setSignUpIsOpen(false);
  const [userMenuAnchor,setUserMenuAnchor] = useState(null);
  const { history , match } = useReactRouter();
  const { context="inBlog" } = props;
  const { breadcrumb = {link:'/posts',label:'Posts'} } = props;
  const handleLinkRedirect = url => {
    if(url.includes("http")) window.location.href = url;
    else history.push(url);
  }
  const anchorHandlerCreator = setter => {
    return evt => {
      setter(evt.currentTarget);
    }
  }
  const menuCloseConstruct = setter => {
    return () => setter(null);
  }
  const handleSignout = () => {
    firebase.auth().signOut().then(function() {
      setUserMenuAnchor(null);
      notify({
        body:"Successfully signed out!",
        alertType:"info"
      });
    }).catch(function(error) {
      console.error(error);
      notify({
        body:error.toString(),
        alertType:"error"
      });
    });
  }
  let bgColor = user.activeUser.color;
  let textColor = getTextColorBasedOnBg(bgColor);
  useEffect(() => {
    if(user.loggedIn && signInIsOpen)
      closeSignIn();
    if(user.loggedIn && signUpIsOpen)
      closeSignUp();
  },[user,signInIsOpen,signUpIsOpen]);
  return (
      <React.Fragment>
        <Slide direction="up" in={!scrollTrigger && user.hydrated}>
          <AppBar style={{backgroundColor:bgColor,...styles.bar}}>
            <Toolbar>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Button onClick={() => handleLinkRedirect(breadcrumb.link)}>
                    <Typography variant="h6" style={{color:textColor,flexGrow:"1"}}>
                      {breadcrumb.label}
                    </Typography>
                  </Button>
                </Grid>
                {(user.loggedIn) ? (
                  <React.Fragment>
                      <Grid item>
                        <BlogBarActions setCreatePostIsOpen={setCreatePostIsOpen} color={textColor} user={user} match={match} history={history} context={context}/>
                      </Grid>
                      <Grid item>
                        <Fade in={user.loggedIn === true} timeout={1500}>
                          <Grid container direction="row" alignItems="center">
                            {(!screenTooSmall) ? (
                              <Grid item>
                                <Typography variant="body2" style={{color:textColor}}>
                                  Welcome, {user.activeUser.username}
                                </Typography>
                              </Grid>
                            ) : null}
                            <Grid item>
                              <IconButton onClick={anchorHandlerCreator(setUserMenuAnchor)}>
                                <AccountCircle style={{color:textColor}}/>
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Fade>
                      </Grid>
                    </React.Fragment>
                ) : (
                  <Fade in={user.loggedIn === false}>
                    <Grid item>
                      <Button style={{color:textColor}} onClick={openSignIn}>Login</Button>
                      <Button style={{color:textColor}} onClick={openSignUp}>Signup</Button>
                    </Grid>
                  </Fade>
                )}
              </Grid>
            </Toolbar>
          </AppBar>
        </Slide>
        <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={menuCloseConstruct(setUserMenuAnchor)}>
          <MenuItem onClick={() => handleLinkRedirect("/user")}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </MenuItem>
          {(getUserPermissions(user) >= 8) ? (
            <MenuItem onClick={() => handleLinkRedirect('/user/posts')}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText
                primary={`Manage${([8,9].includes(getUserPermissions(user))) ? " My " : " "}Posts`} />
            </MenuItem>
          ) : null}
          {(getUserPermissions(user) === 10) ? (
            <MenuItem onClick={() => handleLinkRedirect('/admin/users')}>
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
        <CreatePostDialogue user={user} history={history} createPostIsOpen={createPostIsOpen} setCreatePostIsOpen={setCreatePostIsOpen} />
        <LoginDialogue signInIsOpen={signInIsOpen} setSignInIsOpen={setSignInIsOpen}/>
        <SignupDialogue signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen} />
      </React.Fragment>
  );
}
