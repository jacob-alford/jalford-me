import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField , Grid , Button , Typography } from '@material-ui/core/';

import withUser from '../../bindings/wrappers/withUser';

import firebase from 'firebase/app';
import 'firebase/auth';

const styles = {
  textBox:{
    marginBottom:"10px"
  }
}

function LoginForm(props){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const { user } = props;
  function handleChangeConstructor(setter){
    return evt => setter(evt.target.value);
  }
  function handleSubmit(){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.error(error);
    });
  }
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="body1">
          {user.loggedIn ? `Welcome, ${user.activeUser.username}` : "Sign in"}
        </Typography>
      </Grid>
      <Grid item>
        <TextField style={styles.textBox} variant="outlined"  label="email" onChange={handleChangeConstructor(setEmail)}/>
      </Grid>
      <Grid item>
        <TextField style={styles.textBox} variant="outlined"  type="password" label="password" onChange={handleChangeConstructor(setPassword)}/>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} variant="outlined" color="primary">
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

export default withUser(LoginForm);
