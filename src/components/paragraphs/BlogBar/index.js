import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import * as MUI_COMPONENTS from './mui.js';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import LoginDialogue from 'components/sentences/LoginDialogue';
import SignupDialogue from 'components/sentences/SignupDialogue';

import { firebase } from 'index';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useRHook from 'components/bindings/hooks/useRHook';
import useNotify from 'components/bindings/hooks/useNotify';

import { getTextColorBasedOnBg } from 'functions';

const {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Slide,
  AccountCircle,
  Lock,
  Eject
} = MUI_COMPONENTS;

const styles = {
  bar: {
    position: 'fixed',
    top: 'calc(100% - 64px)',
    transition: 'background-color .25s'
  }
};

export default function BlogBar(props) {
  const { user } = useRHook();
  const scrollTrigger = useScrollTrigger();
  const notify = useNotify({
    timeout: 4500
  });
  const screenTooSmall = useMediaQuery('(max-width:500px)');
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const openSignIn = () => setSignInIsOpen(true);
  const openSignUp = () => setSignUpIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);
  const closeSignUp = () => setSignUpIsOpen(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const history = useHistory();
  const { breadcrumb = { link: '/posts', label: 'Posts' } } = props;
  const handleLinkRedirect = url => {
    setUserMenuAnchor(null);
    if (url.includes('http')) window.location.href = url;
    else history.push(url);
  };
  const anchorHandlerCreator = setter => {
    return evt => {
      setter(evt.currentTarget);
    };
  };
  const menuCloseConstruct = setter => {
    return () => setter(null);
  };
  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUserMenuAnchor(null);
        notify({
          body: 'Successfully signed out!',
          alertType: 'info'
        });
      })
      .catch(function (error) {
        console.error(error);
        notify({
          body: error.toString(),
          alertType: 'error'
        });
      });
  };
  let bgColor = user.details.color;
  let textColor = getTextColorBasedOnBg(bgColor);
  useEffect(() => {
    if (user.loggedIn && signInIsOpen) closeSignIn();
    if (user.loggedIn && signUpIsOpen) closeSignUp();
  }, [user, signInIsOpen, signUpIsOpen]);
  return (
    <React.Fragment>
      <Slide direction='up' in={!scrollTrigger && user.hydrated}>
        <AppBar style={{ backgroundColor: bgColor, ...styles.bar }}>
          <Toolbar>
            <Grid container alignItems='center' justify='space-between'>
              <Grid item>
                <Button onClick={() => handleLinkRedirect(breadcrumb.link)}>
                  <Typography variant='h6' style={{ color: textColor, flexGrow: '1' }}>
                    {breadcrumb.label}
                  </Typography>
                </Button>
              </Grid>
              {user.loggedIn ? (
                <React.Fragment>
                  <Grid item>
                    <Fade in={user.loggedIn === true} timeout={1500}>
                      <Grid container direction='row' alignItems='center'>
                        {!screenTooSmall ? (
                          <Grid item>
                            <Typography variant='body2' style={{ color: textColor }}>
                              Welcome, {user.details.username}
                            </Typography>
                          </Grid>
                        ) : null}
                        <Grid item>
                          <IconButton onClick={anchorHandlerCreator(setUserMenuAnchor)}>
                            <AccountCircle style={{ color: textColor }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Fade>
                  </Grid>
                </React.Fragment>
              ) : (
                <Fade in={user.loggedIn === false}>
                  <Grid item>
                    <Button style={{ color: textColor }} onClick={openSignIn}>
                      Login
                    </Button>
                    <Button style={{ color: textColor }} onClick={openSignUp}>
                      Signup
                    </Button>
                  </Grid>
                </Fade>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={menuCloseConstruct(setUserMenuAnchor)}>
        <MenuItem onClick={() => handleLinkRedirect('/user')}>
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary='Account' />
        </MenuItem>
        <MenuItem onClick={handleSignout}>
          <ListItemIcon>
            <Eject />
          </ListItemIcon>
          <ListItemText primary='Sign Out' />
        </MenuItem>
      </Menu>
      <LoginDialogue signInIsOpen={signInIsOpen} setSignInIsOpen={setSignInIsOpen} />
      <SignupDialogue signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen} />
    </React.Fragment>
  );
}
