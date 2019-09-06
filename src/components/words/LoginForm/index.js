import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from 'firebase/app';
import 'firebase/auth';

import useNotify from '../../bindings/hooks/useNotify';

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
  const { loading , setLoading } = props;
  const notify = useNotify({
    body:"Successfully signed in!",
    alertType:"success",
    timeout:4500
  });
  function handleChangeConstructor(setter){
    return evt => setter(evt.target.value);
  }
  function handleSubmit(){
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(notify)
            .catch(error => {
              console.error(error);
              notify({
                alertType:"error",
                body:error.toString()
              });
            }).finally(() => {
              setLoading(false);
            });
    setLoading(true);
  }
  return (
    <Grid container direction="column">
      <Grid item>
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
