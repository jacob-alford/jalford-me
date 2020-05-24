import React from 'react';
import PuzzleCard from 'components/sentences/PuzzleCard/PuzzleCard';
import puzzleListings from './puzzleListing';
import { Container } from './Puzzle.styled';
import { userState } from 'global-state';
import renderOnPropDiff from 'helpers/renderOnPropDiff';

interface PuzzlesProps {
  user: userState;
}
const Puzzles = (props: PuzzlesProps) => {
  const { user } = props;
  return (
    <Container>
      {Object.values(puzzleListings).map(({ text, difficulty, link, uid }, index) => (
        <PuzzleCard
          completed={user.details.puzzles.includes(uid)}
          difficulty={difficulty}
          text={text}
          key={link}
          link={link}
          trail={index}
        />
      ))}
    </Container>
  );
};

export default renderOnPropDiff(Puzzles);
export { puzzleListings };
