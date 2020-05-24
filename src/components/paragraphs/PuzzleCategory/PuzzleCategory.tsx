import React from 'react';
import { useStoreState } from 'global-state';
import { CatCont, Title, Divider, PuzzleHolder } from './style';
import Puzzles from 'components/paragraphs/Puzzles/Puzzles';

interface Props {
  title: string;
}

const PuzzleCategory = (props: Props) => {
  const { title } = props;
  const theme = useStoreState(store => store.theme);
  const user = useStoreState(store => store.user);
  return (
    <CatCont theme={theme}>
      <Title variant='h2'>{title}</Title>
      <Divider theme={theme} />
      <PuzzleHolder>
        <Puzzles user={user} />
      </PuzzleHolder>
    </CatCont>
  );
};

export default PuzzleCategory;
