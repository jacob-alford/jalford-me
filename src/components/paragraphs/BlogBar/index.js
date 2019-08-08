import React, { useState , useEffect } from 'react';
import { withRouter } from "react-router";
import { AppBar, Toolbar, Typography,
         Button, Grid, IconButton, Menu, MenuItem,
         ListItemText, ListItemIcon, Fade, Slide
       } from '@material-ui/core/';

import { AccountCircle,
         Group,
         Lock,
         ListAlt,
         Eject
       } from '@material-ui/icons/';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import LoginDialogue from '../../sentences/LoginDialogue';
import SignupDialogue from '../../sentences/SignupDialogue';
import BlogBarActions from '../../sentences/BlogBarActions';
import CreatePostDialogue from '../../sentences/CreatePostDialogue';

import { firebase } from '../../../index.js';

import useRHook from '../../bindings/hooks/useRHook';

import { getTextColorBasedOnBg } from '../../../functions'

const styles = {
  bar:{
    position:'fixed',
    top:'calc(100% - 64px)',
    transition:'background-color .25s'
  }
}

const getUserPermissions = user => user.activeUser.permissions.value;

function BlogBar(props){
  const { user } = useRHook();
  const scrollTrigger = useScrollTrigger();
  const [signInIsOpen,setSignInIsOpen] = useState(false);
  const [signUpIsOpen,setSignUpIsOpen] = useState(false);
  const [createPostIsOpen,setCreatePostIsOpen] = useState(false);
  const openSignIn = () => setSignInIsOpen(true);
  const openSignUp = () => setSignUpIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);
  const closeSignUp = () => setSignUpIsOpen(false);
  const [userMenuAnchor,setUserMenuAnchor] = useState(null);
  const [breadcrumbAnchor,setBreadcrumbAnchor] = useState(null);
  const { history,
          match,
          title="Posts",
          context="inBlog",
          breadcrumbs
        } = props;
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
      console.log("Successfully signed out");
      setUserMenuAnchor(null);
    }).catch(function(error) {
      console.error("Failed to sign out!  Reason:",error.toString());
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
        <Slide direction="up" in={!scrollTrigger}>
          <AppBar style={{backgroundColor:bgColor,...styles.bar}}>
            <Toolbar>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Button onClick={anchorHandlerCreator(setBreadcrumbAnchor)}>
                    <Typography variant="h6" style={{color:textColor,flexGrow:"1"}}>
                      {(breadcrumbs && breadcrumbs[0].label) || title}
                    </Typography>
                  </Button>
                  {(breadcrumbs) ? (
                    <Menu anchorEl={breadcrumbAnchor} open={Boolean(breadcrumbAnchor)} onClose={menuCloseConstruct(setBreadcrumbAnchor)}>
                      {[...breadcrumbs].reverse().map((crumb,index) => (
                        <MenuItem key={`MenuItem${index}`} onClick={() => handleLinkRedirect(crumb.url)}>
                          <Typography variant="h6">
                            {crumb.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  ) : null}
                </Grid>
                {(user.loggedIn) ? (
                  <React.Fragment>
                      <Grid item>
                        <BlogBarActions setCreatePostIsOpen={setCreatePostIsOpen} color={textColor} user={user} match={match} history={history} context={context}/>
                      </Grid>
                      <Grid item>
                        <Fade in={user.loggedIn === true} timeout={1500}>
                          <Grid container direction="row" alignItems="center">
                            <Grid item>
                              <Typography variant="body2" style={{color:textColor}}>
                                Welcome, {user.activeUser.username}
                              </Typography>
                            </Grid>
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
        <CreatePostDialogue user={user} history={history} createPostIsOpen={createPostIsOpen} setCreatePostIsOpen={setCreatePostIsOpen} />
        <LoginDialogue signInIsOpen={signInIsOpen} setSignInIsOpen={setSignInIsOpen}/>
        <SignupDialogue signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen} />
      </React.Fragment>
  );
}

export default withRouter(BlogBar);
