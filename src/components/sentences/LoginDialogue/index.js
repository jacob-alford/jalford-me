import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Slide , Modal , Typography , Button , Paper , Grid } from '@material-ui/core/';

import LoginForm from '../../words/LoginForm';

const styles = {
  modal:{
    top:'calc(100% - 228px)',
    left:'calc(100% - 290px)',
    width:"230px",
    padding:"30px",
    position:"absolute"
  }
}

export default function LoginDialogue(props){
  const { signInIsOpen , setSignInIsOpen } = props;
  console.log(props);
  const openModal = () => setSignInIsOpen(true);
  const closeModal = () => setSignInIsOpen(false);
  return (
    <Modal open={signInIsOpen} onClose={closeModal}>
      <Slide direction="left" in={signInIsOpen} mountOnEnter unmountOnExit>
        <Paper style={styles.modal}>
          <Grid container justify="center">
            <Grid item>
              <LoginForm />
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </Modal>
  );
}
