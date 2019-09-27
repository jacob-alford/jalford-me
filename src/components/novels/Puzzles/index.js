import React from 'react';

import PuzzleCard from './PuzzleCard';

import Holder from 'components/words/Holder';

import puzzleListings from './puzzleListing.js';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useRHook from 'components/bindings/hooks/useRHook';

const getPuzzles = user => (user && user.activeUser && user.activeUser.puzzles) || [];

function Puzzles(){
  const { user } = useRHook();
  return (
    <Holder direction="row">
      {Object.values(puzzleListings).filter(({hidden}) => !hidden).map(({emoji,difficulty,link,uid}) => (
        <PuzzleCard completed={getPuzzles(user).includes(uid)} difficulty={difficulty} emoji={emoji} key={link} link={link} />
      ))}
    </Holder>
  );
}

export default withPageFade(Puzzles);
export { puzzleListings };
