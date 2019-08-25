import React from 'react';
import { Container , Paper , Typography } from '@material-ui/core/';

import withPageFade from '../../bindings/wrappers/withPageFade';

const styles = {
  paper:{
    marginTop:'28px',
    padding:'14px',
    paddingTop:'28px',
    paddingBottom:'28px',
    textAlign:'center'
  }
}

function Puzzles(){
  return (
    <Container>
      <Paper style={styles.paper}>
        <Typography variant="h4">
          No puzzles yet!  Check back soon <span role="img" aria-label="smiley face">🙂</span>
        </Typography>
      </Paper>
    </Container>
  );
}

export default withPageFade(Puzzles);
