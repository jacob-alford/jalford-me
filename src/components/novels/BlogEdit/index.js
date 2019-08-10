import React, { useState , useEffect } from 'react';
import Markdown from 'react-markdown';
import { TransitionMotion , Motion , spring } from 'react-motion';
import {
  Container, Typography , Paper,
  CircularProgress, Grid, InputBase,
  Button, IconButton, Chip,
  TextField, Switch, FormControlLabel,
  Divider
 } from '@material-ui/core/';
import Slider from '@material-ui/core/Slider';
import { Visibility , Edit } from '@material-ui/icons';

import { firebase } from '../../../index.js';

import withPageFade from '../../bindings/wrappers/withPageFade';

import useRHook from '../../bindings/hooks/useRHook';
import usePostConnect from '../../bindings/hooks/usePostConnect';
import useTitleSize from '../../bindings/hooks/useTitleSize';

import { getPostId , getSliderSnapshots } from './selectors.js';

import markdownConfig from '../../../helpers/blogParse.js';

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
  latestSnapshotWarning:{
    color:"#E84040",
    transition:'color .25s'
  },
  latestSnapshotContainer:{
    marginBottom:"14px"
  },
  chip:{
    margin:"4px"
  },
  chipHolder:{
    maxWidth:"270px"
  },
  blogEditorViewerHolder:{
    display:'flex',
    flexWrap:'wrap',
    boxSizing:'border-box',
    width:'100%',
    marginTop:'12px',
    marginLeft:'auto',
    marginRight:'auto'
  },
  lead:{
    fontSize:'1.69rem',
    fontWeight:'300',
    color: 'rgba(0,0,0,.85)',
    textAlign:'center'
  }
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
    <Markdown style={{width:'100%'}} renderers={markdownConfig} source={blogText} />
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
            Changed since last publish - Don't forget to snap!
          </Typography>
        );
      }
    }else{
      if(blogText ===  data.snapshots[0].body){
        return (
          <Typography style={styles.latestSnapshotSaved} variant="caption">
            Most Recent Snapshot
          </Typography>
        );
      }else if(blogText !==  data.snapshots[0].body && selectedSnapshot === 1){
        if(blogText !== data.body){
          return (
            <Typography style={styles.latestSnapshotWarning} variant="caption">
              Editing from older published version, newer snapshot available!
            </Typography>
          );
        }else{
          return (
            <Typography style={styles.latestSnapshotSaved} variant="caption">
              Newer Snapshot Available
            </Typography>
          );
        }
      }else{
        return (
          <Typography style={styles.latestSnapshotEdited} variant="caption">
            Changed since latest snapshot - Don't forget to snap!
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

const sameArr = (arr1,arr2) => {
  let wrkArr = [...arr1].sort();
  let wrkArr2 = [...arr2].sort();
  const greatestLength =
    (wrkArr.length > wrkArr2.length) ?
    wrkArr.length
  : wrkArr2.length;
  for(let i=0;i<greatestLength;i++){
    if(wrkArr[i] !== wrkArr2[i])
      return false;
  }
  return true;
}

function BlogEdit(props){
  // --- Helpers ---
  const somethingHasChanged = (checkSnapshots = false) => {
      const testDate1 = new Date(blogDate).toISOString();
      const testDate2 = new Date(data.postData.date.toDate()).toISOString();
      return bodyHasChanged(checkSnapshots)
        || (blogTitle !== data.postData.title)
        || (testDate1 !== testDate2)
        || (isPublic !== data.postData.isPublic)
        || (displayHeading !== data.postData.displayHeading)
        || (!sameArr(blogTags,data.postData.tags))
        || (blogSeries !== data.postData.series)
        || (blogSnippit !== data.postData.snippit);
  }
  const bodyHasChanged = (checkSnapshots = false) => {
    if(!data.postData) return false;
    if(checkSnapshots){
      if(!data.postData.snapshots || data.postData.snapshots.length === 0)
        return bodyHasChanged(false);
      const index = getMappedSliderIndex(selectedSnapshot);
      if(index === null || index === "parent") return bodyHasChanged(false);
      else if(blogText === data.postData.snapshots[index].body) return false;
      else return true;
    }else{
      if(blogText === data.postData.body) return false;
      else return true;
    }
  }
  const getMappedSliderIndex = snap => {
    if(snap === null) return null;
    else if(snap === 1) return "parent";
    else return Math.abs(snap);
  }
  const hasPermissions = () => {
    if(!data.postData) return false;
    else return user.activeUser.permissions === 10
    || user.activeUser.uid === data.postData.owner;
  }

  const { h1:titleSize } = useTitleSize();

  // --- Incoming ---
  const postId = getPostId(props);
  const { user } = useRHook();
  const data = usePostConnect(postId);

  // --- Database Resync ---
  const [shouldUpdate,setShouldUpdate] = useState(false);
  useEffect(() => {
    if(shouldUpdate) setShouldUpdate(false);
  },[shouldUpdate]);

  // --- Snapshots ---
  const [selectedSnapshot,setSelectedSnapshot] = useState(null);
  const handleSnapshotSelect = (evt,value) => setSelectedSnapshot(value);
  /* Sets the snapshot on load */
  useEffect(() => {
    if(data.postData){
      if(data.postData.snapshots && data.postData.snapshots.length > 0){
        if(data.postData.lastPublish){
          if(data.postData.snapshots[0].date.seconds > data.postData.lastPublish.seconds){
            setSelectedSnapshot(0);
          }else{
            setSelectedSnapshot(1);
          }
        }else{
          setSelectedSnapshot(0);
        }
      }else{
        if(data.postData.lastPublish){
          setSelectedSnapshot(1);
        }
      }
    }
  },[data.postData]);

  // --- Title ---
  const [blogTitle,setBlogTitle] = useState(null);
  const handleTitleChange = evt => setBlogTitle(evt.target.value);
  /* Sets the title on load */
  useEffect(() => {
    if((data.postData && blogTitle === null) || shouldUpdate){
      setBlogTitle(data.postData.title);
    }
  },[data.postData,blogTitle,shouldUpdate]);

  // --- Snippit ---
  const [blogSnippit,setBlogSnippit] = useState(null);
  const handleSnippitChange = evt => setBlogSnippit(evt.target.value);
  /* Sets the snippit on load */
  useEffect(() => {
    if((data.postData && blogSnippit === null) || shouldUpdate){
      setBlogSnippit(data.postData.snippit);
    }
  },[data.postData,blogSnippit,shouldUpdate]);

  // --- Date ---
  const [blogDate,setBlogDate] = useState(null);
  const handleDateChange = evt => setBlogDate(evt.target.value);
  /* Sets the date on load */
  useEffect(() => {
    if((data.postData && blogDate === null) || shouldUpdate){
      setBlogDate(new Date(data.postData.date.toDate()).toISOString().slice(0,-1));
    }
  },[data.postData,blogDate,shouldUpdate]);

  // --- Series (Category) ---
  const [blogSeries,setBlogSeries] = useState(null);
  const handleSeriesChange = evt => setBlogSeries(evt.target.value);
  /* Sets the series on load */
  useEffect(() => {
    if((data.postData && blogSeries === null) || shouldUpdate){
      setBlogSeries(data.postData.series || "");
    }
  },[data.postData,blogSeries,shouldUpdate]);

  // --- Tags ---
  const [blogTags,setBlogTags] = useState(null);
  const [addTagBox,setAddTagBox] = useState("");
  const handleTagRemove = index => {
    const copyTags = [...blogTags];
    copyTags.splice(index,1);
    setBlogTags(copyTags);
  }
  const handleAddTagBoxChange = evt => setAddTagBox(evt.target.value);
  const handleAddTag = () => {
    if(addTagBox.trim() !== "" && !blogTags.includes(addTagBox.trim())){
      setBlogTags([addTagBox.trim(),...blogTags]);
    }
  }
  /* Sets the tags on load */
  useEffect(() => {
    if((data.postData && blogTags === null) || shouldUpdate){
      setBlogTags(data.postData.tags);
    }
  },[data.postData,blogTags,shouldUpdate]);

  // --- isPublic ---
  const [isPublic,setIsPublic] = useState(null);
  const handleIsPublicToggle = () => setIsPublic(!isPublic);
  /* Sets the switch on load */
  useEffect(() => {
    if((data.postData && isPublic === null) || shouldUpdate){
      setIsPublic(data.postData.isPublic);
    }
  },[data.postData,isPublic,shouldUpdate]);

  // --- DisplayHeading ---
  const [displayHeading,setDisplayHeading] = useState(null);
  const handleDisplayHeadingToggle = () => setDisplayHeading(!displayHeading);
  /* Sets the switch on load */
  useEffect(() => {
    if((data.postData && displayHeading === null) || shouldUpdate){
      setDisplayHeading(data.postData.displayHeading);
    }
  },[data.postData,displayHeading,shouldUpdate]);

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
  },[selectedSnapshot,data.postData,isEditing]);

  // --- Outgoing ---
  const handleSnap = () => {
    if(hasPermissions() && isEditing && bodyHasChanged()){
      const db = firebase.firestore();
      const post = db.collection("posts").doc(data.postData.uid);
      post.update({
        snapshots:[
          {body:blogText,date:new Date()},
          ...data.postData.snapshots.slice(0,5)
        ]
      }).then(() => {
        console.log("Snapped!");
        setShouldUpdate(true);
      }).catch(error => console.error(error))
        .finally(() => setIsEditing(false));
    }
  }
  const handlePublish = () => {
    if(hasPermissions() && somethingHasChanged()){
      const db = firebase.firestore();
      const post = db.collection("posts").doc(data.postData.uid);
      post.update({
        body:blogText,
        displayHeading:displayHeading,
        title:blogTitle,
        date:new Date(blogDate),
        isPublic:isPublic,
        tags:blogTags,
        lastPublish:new Date(),
        series:blogSeries,
        snapshots:[
          {body:blogText,date:new Date()},
          ...data.postData.snapshots.slice(0,5)
        ],
        snippit:blogSnippit
      }).then(() => {
        console.log("Published!");
        setShouldUpdate(true);
      }).catch(error => console.error(error))
        .finally(() => setIsEditing(false));
    }
  }

  return (
    <React.Fragment>
      <Grid direction="column" container justify="center">
        {(hasPermissions()) ? (
          <Grid item>
            <Grid style={styles.iconGrid}  container direction="row" alignItems="center" justify="space-between">
              <Grid item>
                <Button disabled={!bodyHasChanged(true)} onClick={handleSnap} style={(bodyHasChanged(true)) ? styles.updateSnapshot : styles.disabledUpdateSnapshot} variant="outlined">
                  Snap
                </Button>
              </Grid>
              <Grid item>
                {(isEditing) ? (
                    <IconButton onClick={preview} disabled={bodyHasChanged(true)}>
                      <Visibility style={(bodyHasChanged(true)) ? {...styles.icon,color:"gray"} : styles.icon} />
                    </IconButton>
                  )
                : (
                    <IconButton onClick={edit}>
                      <Edit style={styles.icon} />
                    </IconButton>
                  )}
                  <Button onClick={handlePublish} disabled={!somethingHasChanged()} style={(somethingHasChanged()) ? styles.save : styles.saveDisabled} variant="outlined">
                    Publish
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        {(hasPermissions()) ? (
          <Grid item>
            <Grid container justify="center" style={styles.latestSnapshotContainer}>
              <Grid item>
                <LatestSnapshot selectedSnapshot={selectedSnapshot} blogText={blogText} data={data.postData} />
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        {(hasPermissions() && selectedSnapshot !== null) ?
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
        {(hasPermissions() && blogTags !== null) ? (
          <Grid item>
            <Container style={styles.container}>
              <Paper style={styles.sheet}>
              <Motion defaultStyle={{opacity:0}} style={{opacity:1}}>
                {newStyles => (
                  <Grid container direction="column" style={{opacity:newStyles.opacity}}>
                    <Grid item>
                      <Grid container direction="row" alignItems="center" justify="space-around">
                        <Grid item>
                          <Grid spacing={2} container direction="column">
                            <Grid item>
                              <TextField label="Title" onChange={handleTitleChange} value={blogTitle || ""}/>
                            </Grid>
                            <Grid item>
                              <TextField type="datetime-local" label="Date" value={blogDate || new Date().toISOString()} onChange={handleDateChange} />
                            </Grid>
                            <Grid item>
                              <TextField label="Series" value={blogSeries || ""} onChange={handleSeriesChange}/>
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={<Switch checked={isPublic} onChange={handleIsPublicToggle} />}
                                label="Post is Public" />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={<Switch checked={displayHeading} onChange={handleDisplayHeadingToggle} />}
                                label="Heading is Visible" />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="column" spacing={2}>
                            <Grid item>
                              <TransitionMotion
                                styles={(blogTags || []).map((tag,index) => {
                                  return {
                                    key:`tag${tag}`,
                                    style:{ scale:spring(1) },
                                    data:tag
                                  }
                                })}
                                defaultStyle={blogTags.map(() => {
                                  return { scale:0 };
                                })}
                                willEnter={styleEnter => {
                                  return { scale:0 }
                                }}
                                willLeave={styleLeft => {
                                  return { scale:spring(0) }
                                }}>
                                {newTags => (
                                  <Grid style={styles.chipHolder} container direction="row-reverse" justify="center">
                                    {newTags.map((tag,index) => {
                                      return (
                                        <Grid style={{...styles.chip,transform:`scaleY(${tag.style.scale})`}} item key={tag.key}>
                                          <Chip label={tag.data} color="primary" clickable={false} onDelete={() => handleTagRemove(index)}/>
                                        </Grid>
                                      );
                                    })}
                                  </Grid>
                                )}
                              </TransitionMotion>
                            </Grid>
                            <Grid item>
                              <Grid container direction="row" spacing={1}>
                                <Grid item>
                                  <TextField label="Add Tag" value={addTagBox} onChange={handleAddTagBoxChange}/>
                                </Grid>
                                <Grid item>
                                  <Button color="primary" variant="contained" onClick={handleAddTag}>
                                    Add
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <TextField value={blogSnippit || ""} label="Intro Snippit" multiline rows={6} variant="outlined" onChange={handleSnippitChange} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Motion>
              </Paper>
            </Container>
          </Grid>
        ) : null}
      </Grid>
      <Container style={styles.container}>
        <Paper style={styles.sheet}>
          {(data.isLoading) ? <LoadingPlaceholder /> : null}
          {(hasPermissions() && !data.error) ? (
              <React.Fragment>
                {(displayHeading) ? (
                  <React.Fragment>
                    <Typography paragraph style={{textAlign:"center",fontSize:titleSize}} variant="h1">
                      {blogTitle}
                    </Typography>
                    <Typography paragraph variant="h4" style={{textAlign:"center"}}>
                      <small>{`by ${data.postData.author} `}</small>
                      |
                      <strong>
                        {` ${new Date(blogDate).toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'})}`}
                      </strong>
                    </Typography>
                    <Divider style={{marginTop:"15px",marginBottom:"15px"}}/>
                    {(blogSnippit && blogSnippit !== "") ? (
                      <Typography paragraph style={styles.lead}>
                        {blogSnippit}
                      </Typography>
                    ) : null}
                  </React.Fragment>
                ) : null}
                <EditPost blogText={blogText} setBlogText={setBlogText} isEditing={isEditing} />
              </React.Fragment>
            ) : (data.isLoading) ? null : <NotFoundPlaceholder />}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withPageFade(BlogEdit);
