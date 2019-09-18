import React from 'react';
import Markdown from 'react-markdown';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Comment from 'components/words/Comment';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useRHook from 'components/bindings/hooks/useRHook';
import usePostConnect from 'components/bindings/hooks/usePostConnect';
import useTitleSize from 'components/bindings/hooks/useTitleSize';

import getPostId from './selectors.js';

import markdownConfig from 'helpers/blogParse.js';
import { katexMarkdown } from 'helpers/blogParse.js';

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
  lead:{
    fontSize:'1.42rem',
    fontWeight:'300',
    color: 'rgba(0,0,0,.85)',
    textAlign:'center'
  },
  title:{
    fontSize:'4.7rem'
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

const tempCommentDefault = {
  user:{
    image:'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
    username:'Jacob'
  },
  comment:{
    body:"Lady running down to the riptide taken away to the dark side, I want to be your left hand man, I got a lump in my throat cus you gonna sing the words wolf",
    comments:[
      {
        body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        user:{
          image:'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
          username:'Bob or something'
        },
        depth:5,
        comments:[
          {
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            user:{
              image:'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
              username:'Bob or something'
            },
            depth:2,
            comments:[

            ]
          },
          {
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            user:{
              image:'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
              username:'Bob or something'
            },
            depth:2,
            comments:[
              {
                body:"Hi.",
                user:{
                  image:'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
                  username:'Bob or something'
                },
                depth:3,
                comments:[
                  {
                    body:"Hi.",
                    user:{
                      image:'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
                      username:'Bob or something'
                    },
                    depth:4,
                    comments:[

                    ]
                  },
                  {
                    body:"Hi.",
                    user:{
                      image:'https://jalford.me/assets/me/JA_Pro_Square_web.jpg',
                      username:'Bob or something'
                    },
                    depth:1,
                    comments:[

                    ]
                  }
                ]
              }
            ],
          }
        ]
      }
    ],
    depth:0
  }
}

function BlogView(props){
  const postId = getPostId(props);
  const { user } = useRHook();
  const data = usePostConnect(postId,user);
  const { h1:titleSize } = useTitleSize();
  return (
    <React.Fragment>
      <Comment {...tempCommentDefault}/>
      <Grid container justify="center">
        <Container style={styles.container}>
          <Paper style={styles.sheet}>
            {(!data.isLoading && (data.error || !data.postData)) ? <NotFoundPlaceholder /> : null}
            {(data.isLoading) ? <LoadingPlaceholder /> : null}
            {(!data.isLoading && data.postData && !data.error) ? (
              <React.Fragment>
                {(data.postData.displayHeading) ? (
                  <React.Fragment>
                    <Typography paragraph style={{textAlign:"center",...styles.title,fontSize:titleSize}} variant="h1">
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
                <Markdown renderers={markdownConfig} source={katexMarkdown(data.postData.body)} />
              </React.Fragment>
            ) : null}
          </Paper>
        </Container>
      </Grid>
    </React.Fragment>
  );
}

export default withPageFade(BlogView);
