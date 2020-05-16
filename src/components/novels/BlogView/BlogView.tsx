import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { animated as a, useSpring } from 'react-spring';
import unified from 'unified';
import parse from 'remark-parse';
// @ts-ignore
import remark2react from 'remark-react';
import findIndex from 'lodash/findIndex';
import { useStoreState, blogPost, globalStore, TRIG_BODY_UPDATE } from 'global-state';
import useFetchComments from 'components/bindings/postHooks/usePostComments';
import useTriggerScroll from 'components/bindings/utilityHooks/useTriggerScroll';
import CommentHolder from 'components/sentences/CommentHolder/CommentHolder';
import Loader from 'components/words/Loader';
import { ViewContainer, SuperContainer } from './styles';
import { Link } from './renderers';
import './markdown.css';

const remarkReactComponents = {
  a: Link
};

const BlogView = () => {
  const { postId } = useParams();
  const [hasWaited, setHasWaited] = useState(false);
  const triggerScroll = useTriggerScroll();
  const posts = useStoreState((state: globalStore) => state.posts);
  const theme = useStoreState((state: globalStore) => state.theme);
  const user = useStoreState((state: globalStore) => state.user);
  const dispatch = useDispatch();
  const selectedPostIndex = useMemo(
    () => findIndex<blogPost>(posts, post => post.id === postId),
    [posts, postId]
  );
  const selectedPost = posts[selectedPostIndex] || {};
  const postNotFound = hasWaited && selectedPostIndex === -1;
  const isLoading = !selectedPost.body && !postNotFound;
  const postFade = useSpring({
    opacity: isLoading ? 0 : 1,
    transform: isLoading ? `translate3d(0, -19px, 0)` : `translate3d(0, 0px, 0)`,
    from: {
      opacity: 0,
      transform: `translate3d(0, -19px, 0)`
    },
    config: {
      tension: 169,
      friction: 42,
      precision: 0.0001
    }
  });
  const commentsLoading = selectedPost.comments === null;
  useFetchComments(selectedPostIndex, selectedPost.fbPath);
  useEffect(() => void setTimeout(() => setHasWaited(true), 5000), []);
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
  useEffect(() => {
    if (selectedPost.body) triggerScroll();
  }, [selectedPost.body, triggerScroll]);
  const domPost = useMemo(
    () =>
      (selectedPost.body &&
        unified()
          .use(parse)
          .use(remark2react, { remarkReactComponents })
          //@ts-ignore
          .processSync(selectedPost.body).result) ||
      null,
    [selectedPost.body]
  );
  return (
    <SuperContainer theme={theme}>
      <ViewContainer theme={theme} className='markdown-body'>
        {isLoading && <Loader style={{ padding: 0 }} />}
        <a.div style={postFade}>
          {!postNotFound && domPost}
          {postNotFound && (
            <h2>
              <i>Oops!</i> This post has yet to be written!
            </h2>
          )}
        </a.div>
      </ViewContainer>
      {!commentsLoading && !isLoading && !postNotFound && (
        <CommentHolder
          user={user}
          fbPath={selectedPost.fbPath}
          comments={selectedPost.comments}
        />
      )}
    </SuperContainer>
  );
};

export default BlogView;
