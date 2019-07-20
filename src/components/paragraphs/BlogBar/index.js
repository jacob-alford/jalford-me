import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar , Toolbar , Typography , Button , Paper , Grid } from '@material-ui/core/';

import LoginDialogue from '../../sentences/LoginDialogue';
import SignupDialogue from '../../sentences/SignupDialogue';

import withUser from '../../bindings/wrappers/withUser';

const styles = {
  bar:{
    position:'fixed',
    top:'calc(100% - 64px)'
  }
}

function BlogBar(props){
  const [signInIsOpen,setSignInIsOpen] = useState(false);
  const [signUpIsOpen,setSignUpIsOpen] = useState(false);
  const openSignIn = () => setSignInIsOpen(true);
  const openSignUp = () => setSignUpIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);
  const closeSignUp = () => setSignUpIsOpen(false);
  const { user , headerIsOpen } = props;
  useEffect(() => {
    if(user.loggedIn && signInIsOpen)
      closeSignIn();
    if(user.loggedIn && signUpIsOpen)
      closeSignUp();
  },[user]);
  return (
      <React.Fragment>
        <AppBar style={styles.bar}>
          <Toolbar>
            <Typography variant="h6" style={{flexGrow:1}}>
              Blog
            </Typography>
            {(user.loggedIn) ? (
              <Typography variant="body2">
                Welcome, {user.activeUser.username}
              </Typography>
            ) : (
              <React.Fragment>
                <Button color="inherit" onClick={openSignIn}>Login</Button>
                <Button color="inherit" onClick={openSignUp}>Signup</Button>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
        <LoginDialogue signInIsOpen={signInIsOpen} setSignInIsOpen={setSignInIsOpen}/>
        <SignupDialogue signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen} />
      </React.Fragment>
  );
}

export default withUser(BlogBar);
