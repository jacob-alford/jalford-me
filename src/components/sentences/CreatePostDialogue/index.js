import React, { useState } from 'react';
import { Paper, Modal, TextField,
         Typography, Button
       } from '@material-ui/core/';

import { firebase } from '../../../index.js';

const styles = {
  container:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    padding:"24px"
  },
  centerer:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center"
  },
  title:{
    marginBottom:"14px"
  },
  create:{
    color:"black",
    backgroundColor:"#58E855",
    marginTop:"14px"
  },
  slug:{
    marginTop:"14px"
  }
}

export default function CreatePostDialogue(props){
  const { createPostIsOpen , setCreatePostIsOpen , user , history } = props;
  const [title,setTitle] = useState("");
  const [slug,setSlug] = useState("");
  const [conflict,setConflict] = useState(false);
  const handleClose = () => setCreatePostIsOpen(false);
  const handleTitleChange = evt => setTitle(evt.target.value);
  const handleSlugChange = evt => setSlug(evt.target.value);
  const handleCreate = () => {
    if(user.activeUser && user.activeUser.permissions.value >= 8){
      const db = firebase.firestore();
      const newPost = db.collection("posts").doc(slug);
      newPost.get().then(doc => {
        if(doc.exists){
          setConflict(true);
        }else{
          newPost.set({
            body:"",
            date:new Date(),
            isPublic:false,
            likes:[],
            comments:[],
            owner:user.activeUser.uid,
            series:"default",
            snapshots:[],
            tags:[],
            title:title,
            uid:slug
          }).then(() => {
            console.log("Successfully created post!");
            handleClose();
            history.push(`/blog/edit/${slug}`);
          }).catch(error => {
            console.error(error);
          });
        }
      })
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
          <Button onClick={handleCreate} variant="contained" style={styles.create}>
            Create
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}
