import React, { useState } from 'react';

import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SignupForm from 'components/words/SignupForm';

const styles = {
  modal: {
    position: 'absolute',
    top: '0px',
    left: 'calc(100% - 290px)',
    height: '100vh',
    width: '230px',
    padding: '30px'
  }
};

export default function SignupDialogue(props) {
  const { signUpIsOpen, setSignUpIsOpen } = props;
  const [loading, setLoading] = useState(false);
  const closeModal = () => setSignUpIsOpen(false);
  return (
    <Modal open={signUpIsOpen || loading} onClose={closeModal}>
      <Slide direction='left' in={signUpIsOpen} mountOnEnter unmountOnExit>
        <Paper style={styles.modal}>
          <Grid container justify='center'>
            <Grid item>
              <SignupForm loading={loading} setLoading={setLoading} />
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </Modal>
  );
}
