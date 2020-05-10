import React, { useMemo } from 'react';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import Intro from 'components/paragraphs/Intro/Intro';
import PostCategory from 'components/paragraphs/PostCategory/PostCategory';
import { useStoreState } from 'global-state';

const Home = () => {
  const posts = useStoreState(store => store.posts);
  const postsByDate = useMemo(() => orderBy(posts, ['date', 'title'], ['desc', 'asc']), [
    posts
  ]);
  const dsPosts = useMemo(
    () =>
      orderBy(
        filter(posts, ['category', 'The Duncan Strauss Mysteries']),
        ['id'],
        ['asc']
      ),
    [posts]
  );
  const philPosts = useMemo(
    () =>
      orderBy(
        filter(posts, ['category', 'Philosophy']),
        ['date', 'title'],
        ['desc', 'asc']
      ),
    [posts]
  );
  return (
    <>
      <Intro />
      <PostCategory posts={postsByDate} title='Latest Posts' />
      <PostCategory posts={dsPosts} title='The Duncan Strauss Mysteries' />
      <PostCategory posts={philPosts} title='Philosophy' />
    </>
  );
};

export default Home;
