import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Markdown from 'react-markdown';

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import CommentHolder from 'components/sentences/CommentHolder/CommentHolder';
import Holder from 'components/words/Holder';
import LightDarkToggler from 'components/words/LightDarkToggler';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useTLD from 'components/bindings/hooks/useTLD';
import useFetchComments from 'components/bindings/postHooks/usePostComments';

import { useStoreState, globalStore, TRIG_BODY_UPDATE, blogPost } from 'global-state';

import getPostId from './selectors';

import markdownConfig from 'helpers/blogParse.js';
import { katexMarkdown } from 'helpers/blogParse.js';

import { themeHook } from 'theme';

const useClasses = themeHook(
  ['getMajorSpacing', 'getMinorSpacing'],
  // @ts-ignore
  ([majorSpacing, minorSpacing]) => ({
    header: {
      textAlign: 'center',
      color: 'rgba(0,0,0,.87)'
    },
    container: {
      color: (config: { tldState: string }) =>
        config.tldState === 'light' ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,1)',
      background: (config: { tldState: string }) =>
        config.tldState === 'light' ? '#fff' : '#232323',
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
      color: (config: { tldState: string }) =>
        config.tldState === 'light' ? 'rgba(0,0,0,.69)' : 'rgba(255,255,255,.85)',
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

function BlogView(props: { match: { params: { postId: string } } }) {
  const posts = useStoreState((state: globalStore) => state.posts);
  const user = useStoreState((state: globalStore) => state.user);
  const dispatch = useDispatch();
  const postId = getPostId(props);
  const selectedPost =
    useMemo(() => find(posts, post => post.id === postId), [posts, postId]) || {};
  const selectedPostIndex = useMemo(
    () => findIndex<blogPost>(posts, post => post.id === postId),
    [posts, postId]
  );
  const [tldState, toggleTld] = useTLD();
  const classes = useClasses({ tldState });
  const notFound = isEmpty(selectedPost);
  const isLoading = !isEmpty(selectedPost) && !selectedPost.body;
  const commentsLoading = selectedPost.comments === null;
  useFetchComments(selectedPostIndex, selectedPost.path?.split('.')[0]);
  useEffect(() => {
    if (selectedPost.path)
      dispatch({
        type: TRIG_BODY_UPDATE,
        payload: {
          path: selectedPost.path,
          index: selectedPostIndex
        }
      });
  }, [selectedPost.path, dispatch, selectedPostIndex]);
  return (
    <React.Fragment>
      <Grid container justify='center'>
        <Container className={classes.container}>
          {notFound && <NotFoundPlaceholder />}
          {!notFound && isLoading && <LoadingPlaceholder />}
          {!isLoading && !notFound ? (
            <React.Fragment>
              <Holder
                className={classes.togglerHolder}
                justify='flex-end'
                direction='row'>
                <LightDarkToggler mode={tldState} toggle={toggleTld} />
              </Holder>
              <Markdown
                renderers={markdownConfig}
                source={katexMarkdown(selectedPost.body)}
              />
            </React.Fragment>
          ) : null}
        </Container>
      </Grid>
      {!commentsLoading && !notFound && (
        <CommentHolder
          user={user}
          path={selectedPost.path}
          comments={selectedPost.comments}
        />
      )}
    </React.Fragment>
  );
}

export default withPageFade(BlogView);
