import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Markdown from 'react-markdown';
import { useParams } from 'react-router';

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import CommentHolder from 'components/sentences/CommentHolder/CommentHolder';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useTLD from 'components/bindings/hooks/useTLD';
import useFetchComments from 'components/bindings/postHooks/usePostComments';

import {
  useStoreState,
  globalStore,
  TRIG_BODY_UPDATE,
  blogPost,
  themeState
} from 'global-state';

import markdownConfig from 'helpers/blogParse.js';
import { katexMarkdown } from 'helpers/blogParse.js';

import { themeHook } from 'theme';

import C from 'theme-constants';

const useClasses = themeHook(
  ['getMajorSpacing', 'getMinorSpacing'],
  // @ts-ignore
  ([majorSpacing, minorSpacing]) => ({
    header: {
      textAlign: 'center',
      color: 'rgba(0,0,0,.87)'
    },
    container: {
      color: (props: { tldState: themeState }) => C.text(props.tldState),
      background: (props: { tldState: themeState }) => C.contBack(props.tldState),
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

function BlogView() {
  const { postId } = useParams();
  const posts = useStoreState((state: globalStore) => state.posts);
  const user = useStoreState((state: globalStore) => state.user);
  const dispatch = useDispatch();
  const selectedPost =
    useMemo(() => find(posts, post => post.id === postId), [posts, postId]) || {};
  const selectedPostIndex = useMemo(
    () => findIndex<blogPost>(posts, post => post.id === postId),
    [posts, postId]
  );
  const [tldState] = useTLD();
  const classes = useClasses({ tldState });
  const notFound = isEmpty(selectedPost);
  const isLoading = !isEmpty(selectedPost) && !selectedPost.body;
  const commentsLoading = selectedPost.comments === null;
  useFetchComments(selectedPostIndex, selectedPost.fbPath);
  useEffect(() => {
    if (selectedPost.path && !selectedPost.body)
      dispatch({
        type: TRIG_BODY_UPDATE,
        payload: {
          path: selectedPost.path,
          index: selectedPostIndex
        }
      });
  }, [selectedPost.path, selectedPost.body, dispatch, selectedPostIndex]);
  return (
    <React.Fragment>
      <Grid container justify='center'>
        <Container className={classes.container}>
          {notFound && <NotFoundPlaceholder />}
          {!notFound && isLoading && <LoadingPlaceholder />}
          {!isLoading && !notFound ? (
            <React.Fragment>
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
          fbPath={selectedPost.fbPath}
          comments={selectedPost.comments}
        />
      )}
    </React.Fragment>
  );
}

export default withPageFade(BlogView);
