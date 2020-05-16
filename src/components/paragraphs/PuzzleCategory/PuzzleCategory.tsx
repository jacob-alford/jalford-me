import React from 'react';
import { useStoreState } from 'global-state';
import { CatCont, Title, Divider, PuzzleHolder } from './style';
import Puzzles from 'components/sentences/Puzzles';

interface Props {
  title: string;
  bgOvrd?: string;
  textOvrd?: string;
  divOvrd?: string;
}

const PuzzleCategory = (props: Props) => {
  const { title, bgOvrd, textOvrd, divOvrd } = props;
  const theme = useStoreState(store => store.theme);
  return (
    <CatCont theme={theme} bgOvrd={bgOvrd} textOvrd={textOvrd}>
      <Title variant='h2'>{title}</Title>
      <Divider theme={theme} divOvrd={divOvrd} />
      <PuzzleHolder>
        <Puzzles />
      </PuzzleHolder>
    </CatCont>
  );
};

export default PuzzleCategory;
