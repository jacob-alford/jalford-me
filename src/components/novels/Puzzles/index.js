import React from 'react';
import { useTransition, animated as a } from 'react-spring';

import PuzzleCard from './PuzzleCard';

import Holder from 'components/words/Holder';

import puzzleListings from './puzzleListing.js';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useRHook from 'components/bindings/hooks/useRHook';

const getPuzzles = user => (user && user.activeUser && user.activeUser.puzzles) || [];

function Puzzles() {
	const { user } = useRHook();
	const puzzleAnim = useTransition(Object.values(puzzleListings), listing => listing.uid, {
		initial: { opacity: 0, transform: 'translate3d(0,50px,0)' },
		from: { opacity: 0, transform: 'translate3d(0,50px,0)' },
		enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
		leave: { opacity: 0 },
		trail: 269
	});
	return (
		<Holder direction='row' style={{ paddingTop: '128px' }}>
			{puzzleAnim.map(({ item: { emoji, difficulty, link, uid }, props: newStyles }) => (
				<a.div style={newStyles} key={uid}>
					<PuzzleCard
						completed={getPuzzles(user).includes(uid)}
						difficulty={difficulty}
						emoji={emoji}
						key={link}
						link={link}
					/>
				</a.div>
			))}
		</Holder>
	);
}

export default withPageFade(Puzzles);
export { puzzleListings };
