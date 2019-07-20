import React , { useState , useEffect } from 'react';
import { Container, Grid,
         Typography, Paper,
         List, ListItem,
         ListItemText, ListItemIcon,
         ListItemAvatar, Avatar, Fade,
         CircularProgress, Button,
         Grow, IconButton
      } from '@material-ui/core/';

import { AccountCircle, Image,
         ColorLens, AssignmentInd,
         Edit
       } from '@material-ui/icons/';

import BlogBar from '../../paragraphs/BlogBar';

import withUser from '../../bindings/wrappers/withUser';
import { withRouter } from "react-router";

import useWaitOnUser from '../../bindings/hooks/useWaitOnUser';

import { getTextColorBasedOnBg } from '../../../functions';

const getUser = user => user.activeUser;
const getPermissions = user => {
  if(user.activeUser.permissions.value < 8) return "None";
  else if([8,9].includes(user.activeUser.permissions.value)) return "Writer";
  else return "Admin";
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
  }
}

function UserSettings(props){
  const { user , history } = props;
  const [isEditing,setIsEditing] = useState(false);
  const [mightDelete,setMightDelete] = useState(false);
  const [willDelete,setWillDelete] = useState(false);
  const [goAheadAndDelete,setGoAheadAndDelete] = useState(false);
  const isLoading = useWaitOnUser(user);
  const startEditing = () => setIsEditing(true);
  const finishEditing = () => setIsEditing(false);
  useEffect(() => {
    // if(!user.loggedIn) history.push("/");
  },[user]);
  useEffect(() => {
    if(willDelete && !mightDelete) setWillDelete(false);
  },[mightDelete]);
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
                            {getUser(user).username}
                          </Avatar>
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        style={styles.text}
                        primary="Username"
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="h6">
                              {getUser(user).username}
                            </Typography>
                          </React.Fragment> }/>
                      <IconButton>
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
                      <IconButton>
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
    </React.Fragment>
  );
}

export default withRouter(withUser(UserSettings));
