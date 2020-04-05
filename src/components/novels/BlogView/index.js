import React from 'react';
import Markdown from 'react-markdown';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import CommentHolder from 'components/sentences/CommentHolder';
import Holder from 'components/words/Holder';
import LightDarkToggler from 'components/words/LightDarkToggler';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useRHook from 'components/bindings/hooks/useRHook';
import usePostConnect from 'components/bindings/hooks/usePostConnect';
import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useTLD from 'components/bindings/hooks/useTLD';

import getPostId from './selectors.js';

import markdownConfig from 'helpers/blogParse.js';
import { katexMarkdown } from 'helpers/blogParse.js';

import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getMajorSpacing', 'getMinorSpacing'],
  ([majorSpacing, minorSpacing]) => ({
    header: {
      textAlign: 'center',
      color: 'rgba(0,0,0,.87)'
    },
    container: {
      color: ({ tldState }) =>
        tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
      background: ({ tldState }) => (tldState === 'light' ? '#fff' : '#232323'),
      paddingTop: minorSpacing,
      paddingBottom: majorSpacing,
      marginBottom: minorSpacing,
      transition: 'background .5s, color .5s'
    },
    sheet: {
      padding: '34px'
    },
    notFound: {
      marginTop: minorSpacing,
      textAlign: 'center',
      color: 'rgba(0,0,0,.87)'
    },
    lead: {
      color: ({ tldState }) =>
        tldState === 'light' ? 'rgba(0,0,0,.69)' : 'rgba(255,255,255,.85)',
      transition: 'color .5s',
      fontSize: '1.42rem',
      fontWeight: '300',
      textAlign: 'center'
    },
    title: {
      fontSize: '4.7rem',
      textAlign: 'center'
    },
    togglerHolder: {
      width: '100%'
    }
  })
);

const LoadingPlaceholder = () => (
  <Grid container direction='column' alignItems='center' justify='center'>
    <Grid item>
      <CircularProgress />
    </Grid>
  </Grid>
);

const NotFoundPlaceholder = () => {
  const classes = useClasses();
  return (
    <Typography className={classes.notFound} variant='h6'>
      Post not found!
    </Typography>
  );
};

function BlogView(props) {
  const [tldState, toggleTld] = useTLD();
  const postId = getPostId(props);
  const { user } = useRHook();
  const data = usePostConnect(postId, user);
  const { h1: titleSize } = useTitleSize();
  const classes = useClasses({ tldState });
  return (
    <React.Fragment>
      <Grid container justify='center'>
        <Container className={classes.container}>
          {!data.isLoading && (data.error || !data.postData) ? (
            <NotFoundPlaceholder />
          ) : null}
          {data.isLoading ? <LoadingPlaceholder /> : null}
          {!data.isLoading && data.postData && !data.error ? (
            <React.Fragment>
              <Holder
                className={classes.togglerHolder}
                justify='flex-end'
                direction='row'>
                <LightDarkToggler mode={tldState} toggle={toggleTld} />
              </Holder>
              {data.postData.displayHeading ? (
                <React.Fragment>
                  <Typography
                    paragraph
                    className={classes.title}
                    style={{ fontSize: titleSize }}
                    variant='h1'>
                    {data.postData.title}
                  </Typography>
                  <Typography paragraph variant='h4' style={{ textAlign: 'center' }}>
                    <small>{`by ${data.postData.author} `}</small>|
                    <strong>
                      {` ${new Date(data.postData.date.toDate()).toLocaleDateString(
                        'default',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }
                      )}`}
                    </strong>
                  </Typography>
                  <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
                  {data.postData.snippit ? (
                    <Typography paragraph className={classes.lead}>
                      {data.postData.snippit}
                    </Typography>
                  ) : null}
                </React.Fragment>
              ) : null}
              <Markdown
                renderers={markdownConfig}
                source={katexMarkdown(data.postData.body)}
              />
            </React.Fragment>
          ) : null}
        </Container>
      </Grid>
      {!data.isLoading && !data.error && data.postData ? (
        <CommentHolder
          user={user}
          comments={
            (data.postData && data.postData.sandbox && data.postData.sandbox.comments) ||
            []
          }
          docId={postId}
        />
      ) : null}
    </React.Fragment>
  );
}

export default withPageFade(BlogView);
