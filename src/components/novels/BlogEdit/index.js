import React, { useState , useEffect } from 'react';
import Markdown from 'react-markdown';
import { Motion , spring } from 'react-motion';
import {
  Container , Typography , Paper,
  CircularProgress, Grid, InputBase,
  Button, IconButton, Divider,
  TextField
 } from '@material-ui/core/';
import Slider from '@material-ui/core/Slider';
import { Visibility , Edit } from '@material-ui/icons';

import { firebase } from '../../../index.js';

import withPageFade from '../../bindings/wrappers/withPageFade';
import withUser from '../../bindings/wrappers/withUser';
import usePostConnect from '../../bindings/hooks/usePostConnect';

import { getPostId,
         getLatestSnapshot,
         getLatestSnapshotDate ,
         getSliderSnapshots
       } from './selectors.js';

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

const PermissionDenied = () => (
  <Typography style={styles.denied} variant="h6">
    You do not have permission to edit this post!
  </Typography>
);

const EditPost = props => {
  const { postData , user , isEditing , blogText , setBlogText } = props;
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
  if(data.snapshots.length > 0) {
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
  const hasPermissions = () =>
       user.activeUser.permissions === 10
    || user.activeUser.uid === data.postData.owner;
  // --- Snapshots ---
  const [selectedSnapshot,setSelectedSnapshot] = useState(null);
  const handleSnapshotSelect = (evt,value) => setSelectedSnapshot(value);
  useEffect(() => {
    if(data.postData && data.postData.snapshots.length > 0 && selectedSnapshot === null){
      setSelectedSnapshot(1);
    }
  },[data,selectedSnapshot]);
  // --- Title ---
  const [blogTitle,setBlogTitle] = useState(null);
  const handleTitleChange = evt => setBlogTitle(evt.target.value);
  useEffect(() => {
    if(data.postData && !blogTitle){
      setBlogTitle(data.postData.title);
    }
  },[data,blogTitle]);
  // --- Body View/Edit ---
  const [isEditing,setIsEditing] = useState(false);
  const edit = () => setIsEditing(true);
  const preview = () => setIsEditing(false);
  // --- Body ---
  const [blogText,setBlogText] = useState(null);
  useEffect(() => {
    if(selectedSnapshot !== null && !isEditing){
      const index = getMappedSliderIndex(selectedSnapshot);
      if(index === "parent"){
        setBlogText(data.postData.body);
      }else{
        setBlogText(data.postData.snapshots[index].body);
      }
    }
  },[selectedSnapshot,data,isEditing]);
  const getMappedSliderIndex = snap => {
    if(snap === 1) return "parent";
    else return -1 * snap;
  }
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
  const bodyHasChanged = () => {
    const index = getMappedSliderIndex(selectedSnapshot);
    if(index === "parent"){
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
                  <Typography variant="h6">
                    Snapshots
                  </Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    disabled={isEditing}
                    min={-5}
                    max={1}
                    step={null}
                    defaultValue={1}
                    value={selectedSnapshot}
                    onChange={handleSnapshotSelect}
                    marks={getSliderSnapshots(data.postData)}/>
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
                  <div style={{opacity:newStyles.opacity}}>
                    <TextField label="Title" fullWidth onChange={handleTitleChange} value={blogTitle || ""}/>
                    <Divider style={{marginTop:'24px',marginBottom:'24px'}}/>
                    <EditPost blogText={blogText} setBlogText={setBlogText} isEditing={isEditing} postData={data.postData} user={user.activeUser} />
                  </div>
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
