import React from 'react';
import { Slide , Modal , Paper , Grid } from '@material-ui/core/';

import SignupForm from '../../words/SignupForm';

const styles = {
  modal:{
    position:"absolute",
    top:'calc(100% - 442px)',
    left:'calc(100% - 290px)',
    width:"230px",
    padding:"30px"
  }
}

export default function SignupDialogue(props){
  const { signUpIsOpen , setSignUpIsOpen } = props;
  const closeModal = () => setSignUpIsOpen(false);
  return (
    <Modal open={signUpIsOpen} onClose={closeModal}>
      <Slide direction="left" in={signUpIsOpen} mountOnEnter unmountOnExit>
        <Paper style={styles.modal}>
          <Grid container justify="center">
            <Grid item>
              <SignupForm />
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </Modal>
  );
}
