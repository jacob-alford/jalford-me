import React from 'react';

import Button from '@material-ui/core/Button';

import Holder from 'components/words/Holder';

import { useHistory } from 'react-router-dom';

import { themeHook } from 'theme';

import banner from './banner.svg';

const difficulties = {
	easy: '#43a047',
	medium: '#ffa000',
	hard: '#d32f2f'
};
const bgDifficulty = {
	easy: '#357e37',
	medium: '#c77e00',
	hard: '#a42323'
};

const getDifficulty = difficulty => difficulties[difficulty];
const getDifficultyBg = difficulty => bgDifficulty[difficulty];

const useClasses = themeHook(['getPaperPadding'], ([paperPadding]) => ({
	paper: {
		background: ({ completed, difficulty }) =>
			completed ? '#232323' : getDifficultyBg(difficulty),
		transition: 'background .25s',
		padding: paperPadding,
		cursor: 'pointer',
		width: '175px',
		minHeight: '175px',
		margin: paperPadding,
		borderRadius: '8px',
		border: ({ difficulty = 'easy' }) =>
			`solid 4px ${getDifficulty(difficulty) || ''}`
	},
	icon: {
		fontSize: '75px'
	},
	banner: {
		width: `${200 + 2 * parseInt(paperPadding, 10) + 37}px`,
		position: 'absolute',
		cursor: 'pointer'
	},
	button: {
		background: 'white'
	}
}));

export default function PuzzleCard(props) {
	const { emoji, completed, link } = props;
	const history = useHistory();
	const classes = useClasses(props);
	return (
		<Holder
			className={classes.paper}
			justify='space-between'
			onClick={() => history.push(link)}>
			<div className={`em-svg em-${emoji} ${classes.icon}`} />
			{completed ? (
				<img alt='success banner' src={banner} className={classes.banner} />
			) : null}
			<Button
				variant='outlined'
				disabled={completed}
				className={classes.button}
				onClick={() => history.push(link)}>
				{completed ? 'solved' : 'solve'}
			</Button>
		</Holder>
	);
}
