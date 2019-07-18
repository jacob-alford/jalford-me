import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal , Typography , Button , Paper , Grid } from '@material-ui/core/';

import LoginForm from '../../words/LoginForm';

import withUser from '../../bindings/wrappers/withUser';

const styles = {
  modal:{
    width:"230px",
    padding:"30px",
    position:"absolute",
    left:"50%",
    top:"25%",
    marginLeft:"-115px"
  }
}

function LoginDialogue(props){
  const [isOpen,setIsOpen] = useState(false);
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
      <Modal open={isOpen} onClose={closeModal}>
        <Paper style={styles.modal}>
          <Grid container justify="center">
            <Grid item>
              <LoginForm />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}

export default withUser(LoginDialogue);
