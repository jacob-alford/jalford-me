import React from 'react';
import { useSpring } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Button, { types } from 'components/words/AlfordButton/AlfordButton';
import renderOnPropDiff from 'helpers/renderOnPropDiff';
import { Card, Banner, Title } from './PuzzleCard.styled';
import banner from './banner.svg';

interface PuzzleCardProps {
  text: string;
  completed: boolean;
  link: string;
  difficulty: 'easy' | 'medium' | 'hard';
  trail: number;
}

const PuzzleCard = (props: PuzzleCardProps) => {
  const { text, completed, link, difficulty, trail } = props;
  const cardSpring = useSpring({
    opacity: 1,
    transform: 'translate3d(0px, 0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate3d(0px, 50px, 0px)'
    },
    delay: trail * 269
  });
  const history = useHistory();
  return (
    <Card style={cardSpring} difficulty={difficulty} onClick={() => history.push(link)}>
      {!completed && <Title variant='h1'>{text}</Title>}
      {completed && <Banner alt='success banner' src={banner} />}
      <Button
        type={types.primary}
        disabled={completed}
        onClick={() => history.push(link)}>
        {completed ? 'solved' : 'solve'}
      </Button>
    </Card>
  );
};

export default renderOnPropDiff(PuzzleCard);
