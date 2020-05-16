import React, { useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import unified from 'unified';
import parse from 'remark-parse';
// @ts-ignore
import remark2react from 'remark-react';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { useStoreState, blogPost, globalStore, TRIG_BODY_UPDATE } from 'global-state';
import useFetchComments from 'components/bindings/postHooks/usePostComments';
import { ViewContainer } from './styles';
import './markdown.css';

const BlogView = () => {
  const { postId } = useParams();
  const posts = useStoreState((state: globalStore) => state.posts);
  const user = useStoreState((state: globalStore) => state.user);
  const theme = useStoreState((state: globalStore) => state.theme);
  const dispatch = useDispatch();
  const selectedPost =
    useMemo(() => find(posts, post => post.id === postId), [posts, postId]) || {};
  const selectedPostIndex = useMemo(
    () => findIndex<blogPost>(posts, post => post.id === postId),
    [posts, postId]
  );
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
  const domPost = useMemo(
    () =>
      (selectedPost.body &&
        //@ts-ignore
        unified().use(parse).use(remark2react).processSync(selectedPost.body).result) ||
      null,
    [selectedPost.body]
  );
  return (
    <ViewContainer theme={theme} className='markdown-body'>
      {domPost}
    </ViewContainer>
  );
};

export default BlogView;
