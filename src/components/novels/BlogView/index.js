import React from 'react';
import Markdown from 'react-markdown';
 import { Motion , spring } from 'react-motion';
import {
  Container , Typography , Paper,
  CircularProgress, Grid
 } from '@material-ui/core/';

import withPageFade from '../../bindings/wrappers/withPageFade';
import withUser from '../../bindings/wrappers/withUser';
import usePostConnect from '../../bindings/hooks/usePostConnect';

import getPostId from './selectors.js';

const styles = {
  header:{
    textAlign:'center',
    color:"rgba(0,0,0,.87)"
  },
  container:{
    margin:'14px',
    color:"rgba(0,0,0,.87)",
    transition:'height 2.5s'
  },
  sheet:{
    padding:'34px'
  },
  notFound:{
    textAlign:'center',
    color:"rgba(0,0,0,.87)"
  },
  bodyIn:{
    opacity:0,
    translateY:18
  },
  bodyFinal:{
    opacity:spring(1),
    translateY:spring(0)
  }
}

const markdownConfig = {
  "heading":props => (
    <Typography style={styles.header} variant={`h${props.level}`} {...props}>
      {props.children}
    </Typography>
  )
}

const LoadingPlaceholder = () => (
  <Grid container direction="column" alignItems="center" justify="center">
    <Grid item>
      <CircularProgress />
    </Grid>
  </Grid>
);

const NotFoundPlaceholder = () => (
  <Typography style={styles.notFound} variant="h6">
    Post not found!
  </Typography>
);

function BlogView(props){
  const { user } = props;
  const postId = getPostId(props);
  const data = usePostConnect(postId,user);
  if(data.error) console.error(data.error);
  return (
    <Grid container justify="center">
      <Container style={styles.container}>
        <Paper style={styles.sheet}>
          {(data.notFound || data.error) ? <NotFoundPlaceholder /> : null}
          {(data.isLoading) ? <LoadingPlaceholder /> : null}
          {(data.postData) ? (
            <Motion defaultStyle={styles.bodyIn} style={styles.bodyFinal}>
              {newStyle => {
                const { translateY } = newStyle;
                return(
                  <div style={{transform:`translate(0px,${translateY}px)`,...newStyle}}>
                    <Markdown renderers={markdownConfig} source={data.postData.body} />
                  </div>
              )}}
            </Motion>
          ) : null}
        </Paper>
      </Container>
    </Grid>
  );
}

export default withUser(withPageFade(BlogView));
