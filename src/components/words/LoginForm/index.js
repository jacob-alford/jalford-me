import React, { useState } from 'react';
import {
  Grid, Button,
  TextField, Typography,
  CircularProgress
} from '@material-ui/core/';

import firebase from 'firebase/app';
import 'firebase/auth';

const styles = {
  textBox:{
    marginBottom:"10px"
  },
  error:{
    color:"#E84040"
  },
  loader:{
    marginLeft:'10px'
  }
}

export default function LoginForm(props){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const { loading , setLoading } = props;
  function handleChangeConstructor(setter){
    return evt => setter(evt.target.value);
  }
  function handleSubmit(){
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
              if(error.code === "auth/wrong-password"){
                 setError("Email/Password not recognized!");
              }
            }).finally(() => {
              setLoading(false);
            });
    setLoading(true);
  }
  return (
    <Grid container direction="column">
      <Grid item>
        {(error) ? (
          <Typography paragraph style={styles.error} variant="caption">
            {error}
          </Typography>
        ) : null}
      </Grid>
      <form>
        <Grid item>
          <TextField
            style={styles.textBox}
            variant="outlined"
            label="email"
            onChange={handleChangeConstructor(setEmail)}
            autoComplete="email"/>
        </Grid>
        <Grid item>
          <TextField
            style={styles.textBox}
            variant="outlined"
            type="password"
            label="password"
            onChange={handleChangeConstructor(setPassword)}
            autoComplete="current-password"/>
        </Grid>
      </form>
      <Grid item>
        <Grid container alignItems="center" direction="row">
          <Grid item>
            <Button onClick={handleSubmit} variant="outlined" color="primary">
              Login
            </Button>
          </Grid>
          {(loading) ? (
            <Grid item>
              <CircularProgress style={styles.loader} size={15}/>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
