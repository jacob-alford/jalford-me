import React, { useState , useEffect } from 'react';
import Markdown from 'react-markdown';
import { Motion , spring } from 'react-motion';
import {
  Container , Typography , Paper,
  CircularProgress, Grid, InputBase,
  Button, IconButton, Divider,
  TextField, Switch, FormControlLabel
 } from '@material-ui/core/';
import Slider from '@material-ui/core/Slider';
import { Visibility , Edit } from '@material-ui/icons';

import { firebase } from '../../../index.js';

import withPageFade from '../../bindings/wrappers/withPageFade';
import withUser from '../../bindings/wrappers/withUser';
import usePostConnect from '../../bindings/hooks/usePostConnect';

import { getPostId , getSliderSnapshots } from './selectors.js';

const styles = {
  header:{
    textAlign:'center',
    color:"rgba(0,0,0,.87)"
  },
  container:{
    color:"rgba(0,0,0,.87)",
    transition:'height 2.5s',
    marginTop:'12px'
  },
  sheet:{
    padding:'34px'
  },
  sliderSheet:{
    paddingTop:'12px',
    paddingRight:'24px',
    paddingLeft:'24px',
    paddingBottom:'12px',
    backgroundColor:'#DFEEFF'
  },
  sliderContainer:{
    marginTop:'12px',
    textAlign:"center"
  },
  notFound:{
    textAlign:'center',
    color:"rgba(0,0,0,.87)"
  },
  denied:{
    textAlign:'center'
  },
  icon:{
    color:"white",
    cursor:"pointer"
  },
  iconGrid:{
    paddingTop:"14px",
    paddingLeft:"14px",
    paddingRight:"14px"
  },
  save:{
    color:"#58E855",
    borderColor:"#58E855"
  },
  saveDisabled:{
    color:"gray",
    borderColor:"gray"
  },
  updateSnapshot:{
    color:"#DFEEFF",
    borderColor:"#DFEEFF",
    marginRight:"14px"
  },
  disabledUpdateSnapshot:{
    color:"gray",
    borderColor:"gray",
    marginRight:"14px"
  },
  latestSnapshotSaved:{
    color:"#58E855",
    transition:'color .25s'
  },
  latestSnapshotEdited:{
    color:"#DFEEFF",
    transition:'color .25s'
  },
  latestSnapshotContainer:{
    marginBottom:"14px"
  }
}

const markdownConfig = {
  "heading":props => (
    <Typography style={styles.header} variant={`h${props.level}`} {...props}>
      {props.children}
    </Typography>
  )
}

const LoadingPlaceholder = () => (
  <Grid container direction="column" alignItems="center" justify="center">
    <Grid item>
      <CircularProgress />
    </Grid>
  </Grid>
);

const NotFoundPlaceholder = () => (
  <Typography style={styles.notFound} variant="h6">
    Post not found!
  </Typography>
);

const NoSnapshots = () => (
  <Typography style={styles.notFound} variant="h6">
    There are no snapshots yet!
  </Typography>
);

const PermissionDenied = () => (
  <Typography style={styles.denied} variant="h6">
    You do not have permission to edit this post!
  </Typography>
);

const EditPost = props => {
  const { isEditing , blogText , setBlogText } = props;
  const handleUpdate = evt => setBlogText(evt.target.value);
  if(isEditing) return (
    <InputBase
      onChange={handleUpdate}
      style={styles.editor}
      multiline fullWidth
      value={blogText} />
  );
  else return (
    <Markdown renderers={markdownConfig} source={blogText} />
  );
}

const LatestSnapshot = props => {
  const { data , blogText , selectedSnapshot } = props;
  // --- Blog Creation Greater than latest snapshot ---
  if(data.snapshots.length > 0 && data.lastPublish) {
    if(data.lastPublish.seconds >= data.snapshots[0].date.seconds){
      if(blogText === data.body){
        return (
          <Typography style={styles.latestSnapshotSaved} variant="caption">
            Published Version is Most Recent
          </Typography>
        );
      }else{
        return (
          <Typography style={styles.latestSnapshotEdited} variant="caption">
            Edited - Don't forget to snap!
          </Typography>
        );
      }
    }else{
      if(blogText ===  data.snapshots[0].body && selectedSnapshot !== 1){
        return (
          <Typography style={styles.latestSnapshotSaved} variant="caption">
            Most Recent Snapshot
          </Typography>
        );
      }else if(blogText !==  data.snapshots[0].body && selectedSnapshot === 1){
        return (
          <Typography style={styles.latestSnapshotSaved} variant="caption">
            Newer Snapshot Available
          </Typography>
        );
      }else{
        return (
          <Typography style={styles.latestSnapshotEdited} variant="caption">
            Edited - Don't forget to snap!
          </Typography>
        );
      }
    }
  }else if(!data.lastPublish){
    return (
      <Typography style={styles.latestSnapshotEdited} variant="caption">
        Never Published
      </Typography>
    );
  }else return (
    <Typography style={styles.latestSnapshotSaved} variant="caption">
      Published Version is Most Recent
    </Typography>
  );
}

function BlogEdit(props){
  // --- Incoming ---
  const { user } = props;
  const postId = getPostId(props);
  const data = usePostConnect(postId);

  // --- Snapshots ---
  const [selectedSnapshot,setSelectedSnapshot] = useState(null);
  const handleSnapshotSelect = (evt,value) => setSelectedSnapshot(value);
  /* Sets the snapshot on load */
  useEffect(() => {
    if(data.postData && data.postData.snapshots.length > 0 && selectedSnapshot === null){
      if(data.postData.isPublished){
        setSelectedSnapshot(1);
      }else{
        setSelectedSnapshot(0);
      }
    }
  },[data,selectedSnapshot]);

  // --- Title ---
  const [blogTitle,setBlogTitle] = useState(null);
  const handleTitleChange = evt => setBlogTitle(evt.target.value);
  /* Sets the title on load */
  useEffect(() => {
    if(data.postData && !blogTitle){
      setBlogTitle(data.postData.title);
    }
  },[data,blogTitle]);

  // --- Date ---
  const [blogDate,setBlogDate] = useState(null);
  const handleDateChange = evt => setBlogDate(evt.target.value);
  /* Sets the date on load */
  useEffect(() => {
    if(data.postData && blogDate === null){
      setBlogDate(new Date(data.postData.date.toDate()).toISOString().slice(0,-1));
    }
  },[data,blogDate]);

  // --- isPublic ---
  const [isPublic,setIsPublic] = useState(null);
  const handleIsPublicToggle = () => setIsPublic(!isPublic);
  /* Sets the switch on load */
  useEffect(() => {
    if(data.postData && isPublic === null){
      setIsPublic(data.postData.isPublic);
    }
  },[data,isPublic]);

  // --- Body View/Edit ---
  const [isEditing,setIsEditing] = useState(false);
  const edit = () => setIsEditing(true);
  const preview = () => setIsEditing(false);

  // --- Body ---
  const [blogText,setBlogText] = useState(null);
  /* Handles the body update when slider changes */
  useEffect(() => {
    if(data.postData && selectedSnapshot !== null && !isEditing){
      const index = getMappedSliderIndex(selectedSnapshot);
      if(index === "parent"){
        setBlogText(data.postData.body);
      }else{
        setBlogText(data.postData.snapshots[index].body);
      }
    }else if(data.postData && selectedSnapshot === null && !isEditing){
      setBlogText(data.postData.body);
    }
  },[selectedSnapshot,data,isEditing]);

  // --- Outgoing ---
  const handleSnap = () => {
    if(hasPermissions() && isEditing){
      const db = firebase.firestore();
      const post = db.collection("posts").doc(data.postData.uid);
      post.update({
        snapshots:[
          {body:blogText,date:new Date()},
          ...data.postData.snapshots.slice(0,5)
        ]
      }).then(() => console.log("Snapped!"))
        .catch(error => console.error(error));
    }
  }
  const handlePublish = () => {
    if(hasPermissions() && (isEditing || selectedSnapshot !== 1)){
      const db = firebase.firestore();
      const post = db.collection("posts").doc(data.postData.uid);
      post.update({
        body:blogText,
        title:blogTitle,
        date:new Date(blogDate),
        isPublic:isPublic,
        lastPublish:new Date(),
        snapshots:[
          {body:blogText,date:new Date()},
          ...data.postData.snapshots.slice(0,5)
        ]
      }).then(() => {
        console.log("Published!");
        setSelectedSnapshot(1);
      }).catch(error => console.error(error));
    }
  }

  // --- Helpers ---
  const bodyHasChanged = () => {
    const index = getMappedSliderIndex(selectedSnapshot);
    if(index === null){
      if(blogText !== "") return true;
      else return false;
    }else if(index === "parent"){
      if(blogText !== data.postData.body)
        return true;
      else
        return false;
    }else{
      if(blogText !== data.postData.snapshots[index].body)
        return true;
      else
        return false;
    }
  }
  const getMappedSliderIndex = snap => {
    if(snap === null) return null;
    else if(snap === 1) return "parent";
    else return -1 * snap;
  }
  const hasPermissions = () =>
       user.activeUser.permissions === 10
    || user.activeUser.uid === data.postData.owner;

  if(data.error) console.error(data.error);
  return (
    <Grid direction="column" container justify="center">
      {(data.postData && hasPermissions()) ? (
        <Grid item>
          <Grid style={styles.iconGrid}  container direction="row" alignItems="center" justify="space-between">
            <Grid item>
              <Button disabled={!isEditing} onClick={handleSnap} style={(isEditing) ? styles.updateSnapshot : styles.disabledUpdateSnapshot} variant="outlined">
                Snap
              </Button>
            </Grid>
            <Grid item>
              {(isEditing) ? (
                  <IconButton onClick={preview} disabled={bodyHasChanged()}>
                    <Visibility style={(bodyHasChanged()) ? {...styles.icon,color:"gray"} : styles.icon} />
                  </IconButton>
                )
              : (
                  <IconButton onClick={edit}>
                    <Edit style={styles.icon} />
                  </IconButton>
                )}
                <Button onClick={handlePublish} disabled={selectedSnapshot === 1 && !isEditing} style={(selectedSnapshot !== 1 || isEditing) ? styles.save : styles.saveDisabled} variant="outlined">
                  Publish
                </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {(data.postData && hasPermissions()) ? (
        <Grid item>
          <Grid container justify="center" style={styles.latestSnapshotContainer}>
            <Grid item>
              <LatestSnapshot selectedSnapshot={selectedSnapshot} blogText={blogText} data={data.postData} />
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {(data.postData && hasPermissions()) ?
        <Grid item>
          <Motion defaultStyle={{opacity:0}} style={{opacity:spring(1)}}>
            {newStyles => (
              <Container style={{opacity:newStyles.opacity,...styles.sliderContainer}}>
                <Paper style={styles.sliderSheet}>
                {(data.postData.snapshots.length > 0) ? (
                  <React.Fragment>
                    <Typography variant="h6">
                      Snapshots
                    </Typography>
                    <Slider
                      valueLabelDisplay="auto"
                      disabled={isEditing}
                      min={-5}
                      max={1}
                      step={null}
                      defaultValue={(data.postData.isPublished) ? 1 : 0}
                      value={selectedSnapshot}
                      onChange={handleSnapshotSelect}
                      marks={getSliderSnapshots(data.postData)}/>
                  </React.Fragment>
                ) : <NoSnapshots />}
                </Paper>
              </Container>
            )}
          </Motion>
        </Grid>
      : null}
      <Grid item>
        <Container style={styles.container}>
          <Paper style={styles.sheet}>
            {(data.notFound || data.error) ? <NotFoundPlaceholder /> : null}
            {(data.isLoading) ? <LoadingPlaceholder /> : null}
            {(!data.isLoading && data.postData && !hasPermissions()) ? <PermissionDenied /> : null}
            {(data.postData && hasPermissions()) ? (
              <Motion defaultStyle={{opacity:0}} style={{opacity:1}}>
                {newStyles => (
                  <Grid spacing={2} container direction="column" style={{opacity:newStyles.opacity}}>
                    <Grid item>
                      <TextField label="Title" onChange={handleTitleChange} value={blogTitle || ""}/>
                    </Grid>
                    <Grid item>
                      <TextField type="datetime-local" label="Date" value={blogDate || new Date().toISOString()} onChange={handleDateChange} />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Switch checked={isPublic} onChange={handleIsPublicToggle} />}
                        label="Is Public" />
                    </Grid>
                    <Divider style={{marginTop:'24px',marginBottom:'24px'}}/>
                    <EditPost blogText={blogText} setBlogText={setBlogText} isEditing={isEditing} />
                  </Grid>
                )}
              </Motion>
            ) : null}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}

export default withUser(withPageFade(BlogEdit));
