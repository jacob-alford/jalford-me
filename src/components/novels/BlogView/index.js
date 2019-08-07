import React from 'react';
import Markdown from 'react-markdown';
import { Motion , spring } from 'react-motion';
import {
  Container, Typography, Paper,
  CircularProgress, Grid,
  Divider
 } from '@material-ui/core/';

import withPageFade from '../../bindings/wrappers/withPageFade';
import withUser from '../../bindings/wrappers/withUser';
import usePostConnect from '../../bindings/hooks/usePostConnect';

import getPostId from './selectors.js';

import markdownConfig from '../../../helpers/blogParse.js';

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
  },
  lead:{
    fontSize:'1.69rem',
    fontWeight:'300',
    color: 'rgba(0,0,0,.85)',
    textAlign:'center'
  }
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
  return (
    <Grid container justify="center">
      <Container style={styles.container}>
        <Paper style={styles.sheet}>
          {(!data.isLoading && (data.error || !data.postData)) ? <NotFoundPlaceholder /> : null}
          {(data.isLoading) ? <LoadingPlaceholder /> : null}
          {(!data.isLoading && data.postData && !data.error) ? (
            <Motion defaultStyle={styles.bodyIn} style={styles.bodyFinal}>
              {newStyle => {
                const { translateY } = newStyle;
                return(
                  <div style={{transform:`translate(0px,${translateY}px)`,...newStyle}}>
                    {(data.postData.displayHeading) ? (
                      <React.Fragment>
                        <Typography paragraph style={{textAlign:"center"}} variant="h1">
                          {data.postData.title}
                        </Typography>
                        <Typography paragraph variant="h4" style={{textAlign:"center"}}>
                          <small>{`by ${data.postData.author} `}</small>
                          |
                          <strong>
                            {` ${new Date(data.postData.date.toDate()).toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'})}`}
                          </strong>
                        </Typography>
                        <Divider style={{marginTop:"15px",marginBottom:"15px"}}/>
                        {(data.postData.snippit) ? (
                          <Typography paragraph style={styles.lead}>
                            {data.postData.snippit}
                          </Typography>
                        ) : null}
                      </React.Fragment>
                    ) : null}
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
