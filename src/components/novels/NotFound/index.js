import React from 'react';

import Typography from '@material-ui/core/Typography';

import Container from 'components/words/Holder';
import ReturnToSafety from 'components/words/ArrowLink';
import useReactRouter from 'use-react-router';

import themeConstruct from 'theme';

const styles = themeConstruct(
  ['getMajorSpacing'],
  ([spacing]) => ({
    container:{
      marginTop:spacing,
      color:'white'
    },
    link:{
      color:'#3af'
    },
    fourOhFour:{
      fontWeight:'bold'
    },
    title:{
      textAlign:'center'
    }
  })
);

export default function NotFound(){
  const {
    match:{
      url:pathStr
    }
  } = useReactRouter();
  return (
    <Container style={styles.container}>
      <Typography paragraph variant='h1' style={styles.fourOhFour}>
        404
      </Typography>
      <Typography paragraph variant='h3' style={styles.title}>
        Opps! I couldn't find '{pathStr}.'
      </Typography>
      <Typography paragraph variant="h6">
        My bad...
      </Typography>
      <Typography paragraph variant='h5'>
        enjoy these emoji
      </Typography>
      <Typography paragraph variant='h3'>
        <span role='img' aria-label='computer hacker'>
          👨🏼‍💻
        </span>
        <span role='img' aria-label='detective man'>
          🕵🏼
        </span>
        <span role='img' aria-label='man shrugging'>
          🤷🏼‍♂️
        </span>
      </Typography>
      <div style={styles.link}>
        <ReturnToSafety text='Return home!' href='/' />
      </div>
    </Container>
  );
}
