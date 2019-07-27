import React, { useState , useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  Container , Typography , Paper,
  CircularProgress, Grid, InputBase,
  Button, IconButton
 } from '@material-ui/core/';

import { Visibility , Edit } from '@material-ui/icons';

import { firebase } from '../../../index.js';

import withPageFade from '../../bindings/wrappers/withPageFade';
import withUser from '../../bindings/wrappers/withUser';
import usePostConnect from '../../bindings/hooks/usePostConnect';

import { getPostId , getLatestSnapshot , getLatestSnapshotDate } from './selectors.js';

const styles = {
  header:{
    textAlign:'center',
    color:"rgba(0,0,0,.87)"
  },
  container:{
    color:"rgba(0,0,0,.87)",
    transition:'height 2.5s'
  },
  sheet:{
    padding:'34px'
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
  updateSnapshot:{
    color:"#DFEEFF",
    borderColor:"#DFEEFF",
    marginRight:"14px"
  },
  latestSnapshot:{
    color:"#DFEEFF"
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
  if(postData.owner === user.uid || user.permissions === 10){
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
  }else{
    return (
      <PermissionDenied />
    );
  }
}

const LatestSnapshot = props => {
  const { data } = props;
  // --- Blog Creation Greater than latest snapshot ---
  if(data.snapshots.length > 0) {
    if(data.lastPublish.seconds > data.snapshots[0].date.seconds){
      return (
        <Typography style={styles.latestSnapshot} variant="caption">
          Published Version is Most Recent
        </Typography>
      );
    }else{
      return (
        <Typography style={styles.latestSnapshot} variant="caption">
          Most Recent Snapshot: {new Date(getLatestSnapshotDate(data).toDate()).toUTCString()}
        </Typography>
      );
    }
  }
  else return (
    <Typography style={styles.latestSnapshot} variant="caption">
      No Snapshots
    </Typography>
  );
}

function BlogEdit(props){
  const { user } = props;
  const postId = getPostId(props);
  const data = usePostConnect(postId);
  const [isEditing,setIsEditing] = useState(false);
  const [blogText,setBlogText] = useState(null);
  const edit = () => setIsEditing(true);
  const preview = () => setIsEditing(false);
  const handlePublish = () => {
    const db = firebase.firestore();
    
  }
  useEffect(() => {
    if(data.postData && !blogText){
      setBlogText(getLatestSnapshot(data.postData).body);
    }
  },[data,blogText]);
  if(data.error) console.error(data.error);
  return (
    <Grid direction="column" container justify="center">
      <Grid item>
        <Grid style={styles.iconGrid}  container direction="row" alignItems="center" justify="space-between">
          <Grid item>
            <Button style={styles.updateSnapshot} variant="outlined">
              Snap
            </Button>
          </Grid>
          <Grid item>
            {(isEditing) ? (
                <IconButton onClick={preview}>
                  <Visibility style={styles.icon} />
                </IconButton>
              )
            : (
                <IconButton onClick={edit}>
                  <Edit style={styles.icon} />
                </IconButton>
              )}
              <Button style={styles.save} variant="outlined">
                Publish
              </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center" style={styles.latestSnapshotContainer}>
          <Grid item>
            {(data.postData && !data.isLoading) ? (
              <LatestSnapshot data={data.postData} />
            ) : (
              <Typography style={styles.latestSnapshot} variant="caption">
                Loading Recent Snapshot...
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Container style={styles.container}>
          <Paper style={styles.sheet}>
            {(data.notFound || data.error) ? <NotFoundPlaceholder /> : null}
            {(data.isLoading) ? <LoadingPlaceholder /> : null}
            {(data.postData) ? <EditPost blogText={blogText} setBlogText={setBlogText} isEditing={isEditing} postData={data.postData} user={user.activeUser} /> : null}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}

export default withUser(withPageFade(BlogEdit));
