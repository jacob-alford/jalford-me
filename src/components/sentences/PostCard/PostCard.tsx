import React from 'react';
import { useSpring } from 'react-spring';
import { themeState } from 'global-state';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import { Card, PostTitle, Date, TandD, Actions, Cat } from './style';
import { longDate } from 'functions';
import AlfordButton, { types } from 'components/words/AlfordButton/AlfordButton';
import renderOnPropDiff from 'helpers/renderOnPropDiff';

interface Props {
  title: string;
  date: Date;
  id: string;
  theme: themeState;
  category: string;
  trail: number;
}

const PostCard = (props: Props) => {
  const { theme, title, date, id, category, trail } = props;
  const redirect = useRedirect(`posts/${id}`) as () => void;
  const animStyles = useSpring({
    opacity: 1,
    transform: 'translate3d(0, 0px, 0)',
    from: {
      opacity: 0,
      transform: 'translate3d(0, 50px, 0)'
    },
    delay: trail * 250
  });
  return (
    <Card theme={theme} style={animStyles}>
      <Cat theme={theme}>{category}</Cat>
      <TandD>
        <PostTitle theme={theme} variant='h4'>
          {title}
        </PostTitle>
        <Date theme={theme} variant='h5'>
          {longDate(date)}
        </Date>
      </TandD>
      <Actions>
        <AlfordButton
          onClick={() => redirect()}
          size='small'
          type={types.primary}
          theme={theme}>
          Read More
        </AlfordButton>
      </Actions>
    </Card>
  );
};

export default renderOnPropDiff(PostCard);
