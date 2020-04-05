import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SketchPicker } from 'react-color';

import * as MUI_COMPONENTS from './mui.js';

import withPageFade from 'components/bindings/wrappers/withPageFade';
import { useHistory } from 'react-router-dom';

import { firebase } from 'firebase.js';

import useRHook from 'components/bindings/hooks/useRHook';
import useNotify from 'components/bindings/hooks/useNotify';

import { getTextColorBasedOnBg } from 'functions';

const getUser = user => user.activeUser;
const getPermissions = user => {
  if ([8, 9].includes(user.activeUser.permissions.value)) return 'Writer';
  else if (user.activeUser.permissions.value === 10) return 'Admin';
  else return 'None';
};

const {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Fade,
  CircularProgress,
  Button,
  Grow,
  IconButton,
  Popper,
  TextField,
  ColorLens,
  AssignmentInd,
  Edit
} = MUI_COMPONENTS;

const styles = {
  userContainer: {
    width: '100vw',
    marginTop: '24px'
  },
  settingText: {
    paddingRight: '15px'
  },
  icon: {
    fontSize: 55,
    marginRight: '12px',
    marginLeft: '24px'
  },
  avatar: {
    width: 45.83,
    height: 45.83,
    marginRight: '12px',
    marginLeft: '24px'
  },
  text: {
    marginRight: '24px',
    marginLeft: '12px'
  },
  paper: {
    paddingBottom: '24px',
    transition: 'width .25s'
  },
  loader: {
    marginTop: '50px',
    position: 'absolute'
  },
  deleteText: {
    color: '#E84040',
    borderColor: '#E84040'
  },
  dontDeleteText: {
    color: '#58E855',
    borderColor: '#58E855'
  },
  userData: {
    fontSize: '1.25rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  editUserData: {
    padding: '15px'
  }
};

function UserSettings(props) {
  const history = useHistory();
  // --- State Hooks ---
  const [mightDelete, setMightDelete] = useState(false);
  const [willDelete, setWillDelete] = useState(false);
  const [usernameField, setUsernameField] = useState('');
  const [colorField, setColorField] = useState('');
  const [imageField, setImageField] = useState('');
  const notify = useNotify({
    timeout: 4500
  });
  const notifyError = useCallback(
    (error, msg) => {
      console.error(error);
      notify({
        body: msg || error.toString(),
        alertType: 'error'
      });
    },
    [notify]
  );
  const notifyUpdate = useCallback(
    msg => {
      notify({
        body: msg || 'Successfully updated user!',
        alertType: 'success'
      });
    },
    [notify]
  );
  const db = useRef(firebase.firestore());
  // --- Handlers ---
  const fieldHandlerConstructor = setter => {
    return evt => {
      setter(evt.target.value);
    };
  };
  const handleUserImageUpdate = () => {
    if (db.current && user.loggedIn) {
      const dbUser = db.current.collection('users').doc(getUser(user).uid);
      dbUser
        .update({
          username: usernameField,
          image: imageField
        })
        .then(notifyUpdate)
        .catch(notifyError);
    }
  };
  const handleColorUpdate = () => {
    if (db.current && user.loggedIn) {
      const dbUser = db.current.collection('users').doc(getUser(user).uid);
      dbUser
        .update({
          color: colorField
        })
        .then(notifyUpdate)
        .catch(notifyError);
    }
  };
  const handleUserDelete = () => {
    if (firebase && db.current && user.loggedIn) {
      const authUser = firebase.auth().currentUser;
      if (authUser) {
        authUser
          .delete()
          .then(() => {
            const dbUser = db.current.collection('users').doc(authUser.uid);
            dbUser
              .delete()
              .then(() => {
                notifyUpdate('Successfully deleted user :-(');
              })
              .catch(error =>
                notifyError(
                  'Unable to fully delete user, please contact Jacob for assistance!  Sorry about that! :-('
                )
              );
          })
          .catch(notifyError);
      }
    }
  };
  // --- Custom Hooks ---
  const { userLoading: isLoading, user } = useRHook();
  // --- Anchors ---
  const [nameEditAnchor, setNameEditAnchor] = useState(null);
  const [colorEditAnchor, setColorEditAnchor] = useState(null);
  const handleAnchorUpdateConstructor = (anchor, setter) => {
    return evt => {
      setter(anchor ? null : evt.currentTarget);
    };
  };
  // --- Effects ---
  useEffect(() => {
    if (!user.loggedIn) history.push('/');
  }, [user, history]);
  useEffect(() => {
    if (willDelete && !mightDelete) setWillDelete(false);
  }, [mightDelete, willDelete]);
  useEffect(() => {
    setUsernameField(getUser(user).username);
  }, [user]);
  useEffect(() => {
    setImageField(getUser(user).image);
  }, [user]);
  useEffect(() => {
    setColorField(getUser(user).color);
  }, [user]);
  return (
    <React.Fragment>
      <Grid style={styles.loader} container justify='center'>
        <Grid item>
          <Fade in={isLoading}>
            <CircularProgress color='secondary' />
          </Fade>
        </Grid>
      </Grid>
      <Grid container justify='center' style={styles.userContainer}>
        <Grid item>
          <Fade in={!isLoading} timeout={1000}>
            <Paper style={styles.paper}>
              <Grid
                direction='column'
                container
                alignItems='center'
                justify='space-evenly'>
                <Grid item>
                  <List>
                    <ListItem>
                      {getUser(user).image ? (
                        <ListItemAvatar>
                          <Avatar
                            style={styles.avatar}
                            alt={getUser(user).username}
                            src={getUser(user).image}
                          />
                        </ListItemAvatar>
                      ) : (
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              backgroundColor: getUser(user).color,
                              color: getTextColorBasedOnBg(getUser(user).color)
                            }}>
                            {(getUser(user).username && getUser(user).username[0]) || 'J'}
                          </Avatar>
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        style={styles.text}
                        primary='Username'
                        secondary={
                          <React.Fragment>
                            <Typography component='span' variant='h6'>
                              {getUser(user).username || 'Not Signed In'}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <IconButton
                        onClick={handleAnchorUpdateConstructor(
                          nameEditAnchor,
                          setNameEditAnchor
                        )}>
                        <Edit />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ColorLens
                          style={{ color: getUser(user).color, ...styles.icon }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        style={styles.text}
                        primary='Color'
                        secondary={
                          <React.Fragment>
                            <Typography component='span' variant='h6'>
                              {getUser(user).color}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <IconButton
                        onClick={handleAnchorUpdateConstructor(
                          colorEditAnchor,
                          setColorEditAnchor
                        )}>
                        <Edit />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentInd style={styles.icon} />
                      </ListItemIcon>
                      <ListItemText
                        style={styles.text}
                        primary='Special Permissions'
                        secondary={
                          <React.Fragment>
                            <Typography component='span' variant='h6'>
                              {getPermissions(user)}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid item style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => setMightDelete(true)}
                  variant='outlined'
                  style={styles.deleteText}>
                  Delete Account
                </Button>
              </Grid>
              <Grow in={mightDelete} mountOnEnter unmountOnExit>
                <Grid item style={{ textAlign: 'center', marginTop: '15px' }}>
                  <Button
                    onClick={() => setWillDelete(true)}
                    variant='outlined'
                    style={styles.deleteText}>
                    Are you sure?
                  </Button>
                </Grid>
              </Grow>
              <Grow in={willDelete && mightDelete} mountOnEnter unmountOnExit>
                <React.Fragment>
                  <Grid item style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Button
                      onClick={handleUserDelete}
                      variant='outlined'
                      style={styles.deleteText}>
                      Yes, Delete My Account
                    </Button>
                  </Grid>
                  <Grid item style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Button
                      onClick={() => setMightDelete(false)}
                      variant='outlined'
                      style={styles.dontDeleteText}>
                      No, keep my account
                    </Button>
                  </Grid>
                </React.Fragment>
              </Grow>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
      <Popper
        placement='right'
        open={Boolean(nameEditAnchor)}
        anchorEl={nameEditAnchor}
        transition>
        {props => {
          const { TransitionProps } = props;
          return (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={styles.editUserData}>
                <Grid container direction='column'>
                  <Grid item>
                    <TextField
                      variant='outlined'
                      label='Username'
                      value={usernameField}
                      onChange={fieldHandlerConstructor(setUsernameField)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      variant='outlined'
                      style={{ marginTop: '12px' }}
                      label='Image URL'
                      value={imageField}
                      onChange={fieldHandlerConstructor(setImageField)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ marginTop: '12px' }}
                      color='primary'
                      variant='contained'
                      onClick={handleUserImageUpdate}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
      <Popper
        placement='right'
        open={Boolean(colorEditAnchor)}
        anchorEl={colorEditAnchor}
        transition>
        {props => {
          const { TransitionProps } = props;
          return (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={styles.editUserData}>
                <SketchPicker
                  color={colorField}
                  onChangeComplete={color => setColorField(color.hex)}
                />
                <Button
                  style={{ marginTop: '12px' }}
                  color='primary'
                  variant='contained'
                  onClick={handleColorUpdate}>
                  Update
                </Button>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </React.Fragment>
  );
}

export default withPageFade(UserSettings);
