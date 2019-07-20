import React , { useState , useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { Container, Grid,
         Typography, Paper,
         List, ListItem,
         ListItemText, ListItemIcon,
         ListItemAvatar, Avatar, Fade,
         CircularProgress, Button,
         Grow, IconButton, Popper,
         TextField
      } from '@material-ui/core/';

import { AccountCircle, Image,
         ColorLens, AssignmentInd,
         Edit
       } from '@material-ui/icons/';

import BlogBar from '../../paragraphs/BlogBar';

import withUser from '../../bindings/wrappers/withUser';
import { withRouter } from "react-router";

import { firebase } from '../../../index.js';

import useWaitOnUser from '../../bindings/hooks/useWaitOnUser';

import { getTextColorBasedOnBg } from '../../../functions';

let db;

const getUser = user => user.activeUser;
const getPermissions = user => {
  if([8,9].includes(user.activeUser.permissions.value)) return "Writer";
  else if(user.activeUser.permissions.value === 10) return "Admin";
  else return "None";
}

const styles = {
  userContainer:{
    width:"100vw",
    marginTop:'24px'
  },
  settingText:{
    paddingRight:"15px"
  },
  icon:{
    fontSize:55,
    marginRight:'12px',
    marginLeft:'24px'
  },
  avatar:{
    width:45.83,
    height:45.83,
    marginRight:'12px',
    marginLeft:'24px'
  },
  text:{
    marginRight:'24px',
    marginLeft:'12px'
  },
  paper:{
    paddingBottom:"24px",
    transition:"width .25s"
  },
  loader:{
    marginTop:"50px",
    position:'absolute'
  },
  deleteText:{
    color:"#E84040",
    borderColor:"#E84040"
  },
  dontDeleteText:{
    color:"#58E855",
    borderColor:"#58E855"
  },
  userData:{
    fontSize:'1.25rem',
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight:'500',
    lineHeight:'1.6',
    letterSpacing:'0.0075em',
    color:'rgba(0, 0, 0, 0.54)'
  },
  editUserData:{
    padding:"15px"
  }
}

function UserSettings(props){
  const { user , history } = props;
  // --- State Hooks ---
  const [mightDelete,setMightDelete] = useState(false);
  const [willDelete,setWillDelete] = useState(false);
  const [goAheadAndDelete,setGoAheadAndDelete] = useState(false);
  const [usernameField,setUsernameField] = useState("");
  const [colorField,setColorField] = useState("");
  const [imageField,setImageField] = useState("");
  // --- Handlers ---
  const fieldHandlerConstructor = setter => {
    return evt => {
      setter(evt.target.value);
    }
  }
  const handleUserImageUpdate = () => {
    if(db && user.loggedIn){
      const dbUser = db.collection("users").doc(getUser(user).uid);
      dbUser.update({
        username:usernameField,
        image:imageField
      }).then(console.log("Updated successfully!"))
        .catch(error => console.error(error));
    }
  }
  const handleColorUpdate = () => {
    if(db && user.loggedIn){
      const dbUser = db.collection("users").doc(getUser(user).uid);
      dbUser.update({
        color:colorField
      }).then(console.log("Updated successfully!"))
        .catch(error => console.error(error));
    }
  }
  // --- Custom Hooks ---
  const isLoading = useWaitOnUser(user);
  // --- Anchors ---
  const [nameEditAnchor,setNameEditAnchor] = useState(null);
  const [colorEditAnchor,setColorEditAnchor] = useState(null);
  const handleAnchorUpdateConstructor = (anchor,setter) => {
    return evt => {
      setter((anchor) ? null : evt.currentTarget);
    }
  }
  // --- Effects ---
  useEffect(() => {
    if(!goAheadAndDelete && !user.loggedIn){
      history.push("/");
    }else if(goAheadAndDelete && !user.loggedIn){
      setGoAheadAndDelete(false);
    }
  },[user]);
  useEffect(() => {
    if(willDelete && !mightDelete) setWillDelete(false);
  },[mightDelete]);
  useEffect(() => {
    setUsernameField(getUser(user).username);
  },[getUser(user).username]);
  useEffect(() => {
    setImageField(getUser(user).image);
  },[getUser(user).image]);
  useEffect(() => {
    setColorField(getUser(user).color);
  },[getUser(user).color]);
  useEffect(() => {
    if(firebase) db = firebase.firestore();
  },[firebase]);
  useEffect(() => {
    if(firebase && db && user.loggedIn && goAheadAndDelete){
      const authUser = firebase.auth().currentUser;
      if(authUser){
        authUser.delete().then(() => {
          console.log("Successfully deleted auth user.");
          const dbUser = db.collection("users").doc(authUser.uid);
          dbUser.delete().then(() => {
            console.log("Successfully deleted database user.");
          }).catch(error => console.error(error));
        }).catch(error => console.error(error));
      }
    }
  },[goAheadAndDelete]);
  return (
    <React.Fragment>
      <Grid style={styles.loader} container justify="center">
        <Grid item>
          <Fade in={isLoading}>
            <CircularProgress color="secondary"/>
          </Fade>
        </Grid>
      </Grid>
      <Grid container justify="center" style={styles.userContainer}>
        <Grid item>
          <Fade in={!isLoading} timeout={1000}>
            <Paper style={styles.paper}>
              <Grid direction="column" container alignItems="center" justify="space-evenly">
                <Grid item>
                  <List>
                    <ListItem>
                      {(getUser(user).image) ? (
                        <ListItemAvatar>
                          <Avatar
                            style={styles.avatar}
                            alt={getUser(user).username}
                            src={getUser(user).image} />
                        </ListItemAvatar>
                      ) : (
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              backgroundColor:getUser(user).color,
                              color:getTextColorBasedOnBg(getUser(user).color)
                            }}>
                            {(getUser(user).username && getUser(user).username[0]) || "J"}
                          </Avatar>
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        style={styles.text}
                        primary="Username"
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="h6">
                              {getUser(user).username || "Not Signed In"}
                            </Typography>
                          </React.Fragment> }/>
                      <IconButton onClick={handleAnchorUpdateConstructor(nameEditAnchor,setNameEditAnchor)}>
                        <Edit />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ColorLens style={{color:getUser(user).color,...styles.icon}} />
                      </ListItemIcon>
                      <ListItemText
                        style={styles.text}
                        primary="Color"
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="h6">
                              {getUser(user).color}
                            </Typography>
                          </React.Fragment> }/>
                      <IconButton onClick={handleAnchorUpdateConstructor(colorEditAnchor,setColorEditAnchor)}>
                        <Edit />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentInd style={styles.icon} />
                      </ListItemIcon>
                      <ListItemText
                        style={styles.text}
                        primary="Special Permissions"
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="h6">
                              {getPermissions(user)}
                            </Typography>
                          </React.Fragment> }/>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid item style={{textAlign:"center"}}>
                <Button onClick={() => setMightDelete(true)} variant="outlined" style={styles.deleteText}>
                  Delete Account
                </Button>
              </Grid>
              <Grow in={mightDelete} mountOnEnter unmountOnExit>
                <Grid item style={{textAlign:"center",marginTop:"15px"}}>
                  <Button onClick={() => setWillDelete(true)} variant="outlined" style={styles.deleteText}>
                    Are you sure?
                  </Button>
                </Grid>
              </Grow>
              <Grow in={willDelete && mightDelete} mountOnEnter unmountOnExit>
                <React.Fragment>
                  <Grid item style={{textAlign:"center",marginTop:"15px"}}>
                    <Button onClick={() => setGoAheadAndDelete(true)} variant="outlined" style={styles.deleteText}>
                      Yes, Delete My Account
                    </Button>
                  </Grid>
                  <Grid item style={{textAlign:"center",marginTop:"15px"}}>
                    <Button onClick={() => setMightDelete(false)} variant="outlined" style={styles.dontDeleteText}>
                      No, keep my account
                    </Button>
                  </Grid>
                </React.Fragment>
              </Grow>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
      <BlogBar title="User" context="inUser"/>
      <Popper placement="right" open={Boolean(nameEditAnchor)} anchorEl={nameEditAnchor} transition>
        {props => {
          const {TransitionProps} = props;
          return (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={styles.editUserData}>
                <Grid container direction="column">
                  <Grid item>
                    <TextField variant="outlined" label="Username" value={usernameField} onChange={fieldHandlerConstructor(setUsernameField)} />
                  </Grid>
                  <Grid item>
                    <TextField variant="outlined" style={{marginTop:"12px"}} label="Image URL" value={imageField} onChange={fieldHandlerConstructor(setImageField)} />
                  </Grid>
                  <Grid item>
                    <Button style={{marginTop:"12px"}} color="primary" variant="contained" onClick={handleUserImageUpdate}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
      <Popper placement="right" open={Boolean(colorEditAnchor)} anchorEl={colorEditAnchor} transition>
        {props => {
          const {TransitionProps} = props;
          return (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={styles.editUserData}>
                <SketchPicker color={colorField} onChangeComplete={color => setColorField(color.hex)} />
                <Button style={{marginTop:"12px"}} color="primary" variant="contained" onClick={handleColorUpdate}>
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

export default withRouter(withUser(UserSettings));
