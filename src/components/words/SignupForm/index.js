import React, { useState , useEffect } from 'react';
import {
  Grid, Button, Typography,
  TextField, CircularProgress
} from '@material-ui/core/';
import { SliderPicker } from 'react-color';

import zxcvbn from 'zxcvbn';

import { validateEmail,
         validateUsername,
         randomColor
       } from '../../../functions';

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
    marginTop:"24px"
  },
  submitButton:{
    marginTop:"6px"
  },
  "pwStrength0":{
    transition:"text-shadow .25s",
    textShadow: '0px 10px 14px #E84040'
  },
  "pwStrength1":{
    transition:"text-shadow .25s",
    textShadow: '0px 10px 14px #FF7272'
  },
  "pwStrength2":{
    transition:"text-shadow .25s",
    textShadow: '0px 10px 14px #FFF356'
  },
  "pwStrength3":{
    transition:"text-shadow .25s",
    textShadow: '0px 10px 14px #CBFF30'
  },
  "pwStrength4":{
    transition:"text-shadow .25s",
    textShadow: '0px 10px 14px #58E855'
  },
  loader:{
    marginLeft:'10px'
  }
}

const passwordStrengthText = [
  "password too weak (score: 0)",
  "password not strong enough (score: 1)",
  "Password good enough (score 2)",
  "Pretty good password :-) (score 3)",
  "Very nice password!!! (score 4)"
];

export default function SignupForm(props){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [username,setUsername] = useState("");
  const [color,setColor] = useState(randomColor());
  const [error,setError] = useState();
  const { loading , setLoading } = props;
  function validForm(){
    return validateEmail(email)
        && passwordScore >= 2
        && validateUsername(username);
  }
  function handleChangeConstructor(setter){
    return evt => setter(evt.target.value);
  }
  function handleSubmit(){
    if(validForm()){
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
        }).then(function(docRef) {
          console.log("Successfully added user:",docRef);
        }).catch(function(error) {
          setError(error.toString());
          console.error(error);
        });
      }).catch(error => {
        setError(error.toString());
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });
      setLoading(true);
    }
  }
  useEffect(() => {
    db = firebase.firestore();
  });
  useEffect(() => {
    setPasswordScore(zxcvbn(password).score);
  },[password]);
  return (
    <Grid container direction="column" justify="center">
      {(error) ? (
        <Grid item>
          <Typography variant="body2" style={{color:"#E84040",marginBottom:"24px"}}>
            {error}
          </Typography>
        </Grid>
      ) : null }
      <Grid item>
        <TextField error={!(email === "" || validateEmail(email))} style={styles.textBox} variant="outlined"  label="email" onChange={handleChangeConstructor(setEmail)}/>
      </Grid>
      <Grid item>
        <TextField error={!(username === "" || validateUsername(email))} style={styles.textBox} variant="outlined" label="username" onChange={handleChangeConstructor(setUsername)}/>
      </Grid>
      <Grid item>
        <TextField error={!(password === "" || passwordScore >= 2)} style={styles.textBox} variant="outlined"  type="password" label="password" onChange={handleChangeConstructor(setPassword)}/>
      </Grid>
      <Grid item>
        <Typography style={styles[`pwStrength${passwordScore}`]}>
          {passwordStrengthText[passwordScore]}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography variant="body2" style={styles.labelText}>
              User Color
            </Typography>
          </Grid>
          <Grid item style={styles.colorSlider}>
            <SliderPicker color={color} onChange={color => setColor(color.hex)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" direction="row">
          <Grid item>
            <Button disabled={!validForm()} style={(validForm()) ? {color:color,...styles.submitButton} : styles.submitButton} onClick={handleSubmit} variant="outlined" color="primary">
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            {(loading) ? (
              <CircularProgress style={styles.loader} size={15} />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
