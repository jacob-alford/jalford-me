import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import themeConstruct from 'theme';

const styles = themeConstruct(
  ['getPaperPadding','getMajorSpacing'],
  ([paperPadding,majorSpacing]) => ({
    paper:{
      marginTop:majorSpacing,
      padding:paperPadding,
      textAlign:'center'
    }
  })
);

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
