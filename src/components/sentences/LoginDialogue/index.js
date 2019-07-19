import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Slide , Modal , Typography , Button , Paper , Grid } from '@material-ui/core/';

import LoginForm from '../../words/LoginForm';
import SignupForm from '../../words/SignupForm';

import withUser from '../../bindings/wrappers/withUser';

const styles = {
  modal:{
    top:"100%",
    marginTop:"-230px",
    width:"100vw",
    minHeight:"230px",
    padding:"30px",
    position:"absolute"
  }
}

function LoginDialogue(props){
  const [isOpen,setIsOpen] = useState(false);
  const [signInOrUp,setSignInOrUp] = useState("signIn");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { user } = props;
  return (
    <React.Fragment>
      {user.loggedIn
        ? (
          <Typography variant="body2">
            Welcome, {user.activeUser.username}
          </Typography> )
        : (
          <Button variant="outlined" color="primary" onClick={openModal}>
            Sign in
          </Button>
        )}
        <SignupForm />
      <Modal open={isOpen} onClose={closeModal}>
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
          <Paper style={styles.modal}>
            <Grid container justify="center">
              <Grid item>
                <LoginForm />

              </Grid>
            </Grid>
          </Paper>
        </Slide>
      </Modal>
    </React.Fragment>
  );
}

export default withUser(LoginDialogue);
