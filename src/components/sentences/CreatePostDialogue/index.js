import React, { useState , useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebase } from 'firebase.js';

import useNotify from 'components/bindings/hooks/useNotify';

const styles = {
  container:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    padding:"24px"
  },
  buttonContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start"
  },
  centerer:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center"
  },
  title:{
    marginBottom:"14px",
    textAlign:'center'
  },
  create:{
    color:"black",
    backgroundColor:"#58E855",
    marginTop:"14px",
    transition:'background-color .25s'
  },
  createDisabled:{
    marginTop:"14px",
    transition:'background-color .25s'
  },
  slug:{
    marginTop:"14px"
  },
  loader:{
    marginTop:'12px'
  }
}

export default function CreatePostDialogue(props){
  const { createPostIsOpen , setCreatePostIsOpen , user , history } = props;
  const [title,setTitle] = useState("");
  const [slug,setSlug] = useState("");
  const [conflict,setConflict] = useState(false);
  const [loading,setLoading] = useState(false);
  const handleClose = () => setCreatePostIsOpen(false);
  const handleTitleChange = evt => setTitle(evt.target.value);
  const handleSlugChange = evt => setSlug(evt.target.value);
  const isFilled = () => title !== "" && slug !== "";
  const notify = useNotify({
    timeout:4500,
    body:"Successfully created post!",
    alertType:"success"
  });
  const notifyError = useCallback(error => {
    console.error(error);
    notify({
      body:error.toString(),
      alertType:"error"
    });
  },[notify]);
  const handleCreate = () => {
    if(user.activeUser && user.activeUser.permissions.value >= 8){
      setLoading(true);
      const db = firebase.firestore();
      const newPost = db.collection("posts").doc(slug);
      newPost.get().then(doc => {
        if(doc.exists){
          setConflict(true);
        }else{
          newPost.set({
            author:user.activeUser.username,
            body:"",
            date:new Date(),
            erased:false,
            isPublic:false,
            displayHeading:false,
            likes:[],
            comments:[],
            owner:user.activeUser.uid,
            series:"default",
            snapshots:[],
            snippit:"",
            tags:[],
            title:title,
            uid:slug
          }).then(() => {
            console.log("Successfully created post!");
            setLoading(false);
            notify();
          }).catch(notifyError)
            .finally(() => {
              setCreatePostIsOpen(false);
              history.push(`/posts/edit/${slug}`);
            });
        }
      }).catch(notifyError)
        .finally(() => setLoading(false));
    }
  }
  return (
    <Modal style={styles.centerer} open={createPostIsOpen} onClose={handleClose}>
      <Paper>
        <div style={styles.container}>
          <Typography variant="h3" style={styles.title}>
            Create Post
          </Typography>
          <TextField label="Title" variant="outlined" value={title} onChange={handleTitleChange}/>
          <TextField error={conflict} style={styles.slug} label="Slug" variant="outlined" value={slug} onChange={handleSlugChange}/>
            <Button disabled={!isFilled()} onClick={handleCreate} variant="contained" style={(isFilled()) ? styles.create : styles.createDisabled}>
              {(loading) ? (
                <div>
                  <CircularProgress style={styles.loader} size={15}/>
                </div>
              ) : "Create"}
            </Button>
        </div>
      </Paper>
    </Modal>
  );
}
