import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input , Grid , Button , Typography , TextField } from '@material-ui/core/';
import { SliderPicker } from 'react-color';

import { firebase } from '../../../index.js';
let db;

const styles = {
  textBox:{
    marginBottom:"10px"
  },
  colorSlider:{
    minWidth:"230px",
    marginTop:"6px",
    marginBottom:"24px"
  },
  labelText:{
    marginTop:"6px"
  },
  submitButton:{
    marginTop:"6px"
  }
}

function randomColor(){
  return `#${[
    Math.floor(Math.random()*255).toString(16),
    Math.floor(Math.random()*255).toString(16),
    Math.floor(Math.random()*255).toString(16)
  ].join("")}`;
}

export default function SignupForm(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [color,setColor] = useState(randomColor());
  function handleChangeConstructor(setter){
    return evt => setter(evt.target.value);
  }
  function handleSubmit(){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
      const { user } = data;
      db.collection("users").doc(user.uid).set({
        username: username,
        color: color,
        permissions:{
          value:1
        },
        icon:"person",
        image:null
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }).catch(error => {
      console.error(error);
    });
  }
  useEffect(() => {
    db = firebase.firestore();
  });
  return (
    <Grid container direction="column">
      <Grid item>
        <TextField style={styles.textBox} variant="outlined"  label="email" onChange={handleChangeConstructor(setEmail)}/>
      </Grid>
      <Grid item>
        <TextField style={styles.textBox} variant="outlined"  type="password" label="password" onChange={handleChangeConstructor(setPassword)}/>
      </Grid>
      <Grid item>
        <TextField style={styles.textBox} variant="outlined" label="username" onChange={handleChangeConstructor(setUsername)}/>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography variant="body2" style={styles.labelText}>
              User Color
            </Typography>
          </Grid>
          <Grid item style={styles.colorSlider}>
            <SliderPicker color={color} onChangeComplete={color => setColor(color.hex)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button style={styles.submitButton} onClick={handleSubmit} variant="outlined" color="primary">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
