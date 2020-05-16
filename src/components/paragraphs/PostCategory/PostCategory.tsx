import React, { useMemo } from 'react';
import slice from 'lodash/slice';
import { blogPost, useStoreState } from 'global-state';
import PostCard from 'components/sentences/PostCard/PostCard';
import { CatCont, Title, Divider, PostHolder } from './style';
import Loader from 'components/words/Loader';

interface Props {
  posts: blogPost[];
  title: string;
  limit?: number;
  bgOvrd?: string;
  textOvrd?: string;
  divOvrd?: string;
}

const PostCategory = (props: Props) => {
  const { posts, limit, title, bgOvrd, textOvrd, divOvrd } = props;
  const slicedPosts = useMemo(() => slice(posts, 0, limit), [posts, limit]);
  const theme = useStoreState(store => store.theme);
  const loading = posts.length === 0;
  return (
    <CatCont theme={theme} bgOvrd={bgOvrd} textOvrd={textOvrd}>
      <Title variant='h2'>{title}</Title>
      <Divider theme={theme} divOvrd={divOvrd} />
      {loading && <Loader />}
      {!loading && (
        <PostHolder>
          {slicedPosts.map(({ title, date, id, path, category }, index) => (
            <PostCard
              key={id}
              theme={theme}
              title={title}
              date={date}
              id={id}
              category={category}
              trail={index}
            />
          ))}
        </PostHolder>
      )}
    </CatCont>
  );
};

export default PostCategory;
