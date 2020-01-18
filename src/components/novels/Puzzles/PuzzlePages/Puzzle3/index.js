import React, { useReducer, useEffect } from 'react';
import { useTransition, animated as a } from 'react-spring';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Holder from 'components/words/Holder';

import SHA3 from 'crypto-js/sha3';
import AES from 'crypto-js/aes';
import UTF8Enc from 'crypto-js/enc-utf8';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useClasses from './style.js';
import usePuzzleConnect from '../usePuzzleConnect.js';
import useRPuzzUpdate from '../useRPuzzUpdate.js';
import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useLock from 'components/bindings/hooks/useLock';
import useNotify from 'components/bindings/hooks/useNotify';

import { reducer, initialState } from './reduction.js';

import PnPill from './PnPill.js';

const getVal = (state, index) => state.values[index];
const getSuccess = (state, index) => state.success[index];
const getHash = (data, index) => data && data.hintHash[index];
const getPuzzleCipher = data => data && data.solutionCipher;

const createSetter = (actor, index) => evt =>
	actor({ type: 'setVal', val: evt.target.value, index });
const isComplete = state =>
	state.reduce((acc, newst) => acc && Boolean(newst), true);

const sha3Check = (test, hash) => SHA3(test).toString() === hash;
const setSuccessHeader = (test, hash, setter) => () => {
	if (test && hash && sha3Check(test, hash)) setter(true);
	else setter(false);
};

const pills = [
	{ swap: true, label: 'heartbreak', id: 'pill1' },
	{ label: 'suntan', id: 'pill2' },
	{ swap: true, label: 'antibiotics', id: 'pill3' },
	{ label: 'rested', id: 'pill4' },
	{ swap: true, label: 'apologist', id: 'pill5' },
	{ label: 'ale', id: 'pill6' }
];

function Puzzle3() {
	const classes = useClasses();
	const { h1: titleSize } = useTitleSize();
	const pillTransitions = useTransition(pills, item => item.id, {
		initial: { opacity: 0, transform: 'translate3d(0,-50px,0)' },
		from: { opacity: 0, transform: 'translate3d(0,-50px,0)' },
		enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
		leave: { opacity: 0 },
		trail: 75
	});

	const { puzzleData } = usePuzzleConnect('19-3-3');
	const [notifyLocked, lockNotifications] = useLock(false);
	const setUserSuccess = useRPuzzUpdate('19-3-3');
	const notify = useNotify({
		timeout: Infinity,
		alertType: 'success'
	});

	const [puzzleState, actOnPuzzleState] = useReducer(reducer, initialState);

	useEffect(() => {
		if (isComplete(puzzleState.success) && !notifyLocked) {
			try {
				const password = puzzleState.values.join('');
				const solution = AES.decrypt(
					getPuzzleCipher(puzzleData),
					password
				).toString(UTF8Enc);
				if (Boolean(solution)) {
					lockNotifications();
					notify({
						body: solution
					});
					setUserSuccess();
				}
			} catch (err) {
				console.error(err);
			}
		}
	}, [
		puzzleState.success,
		lockNotifications,
		notify,
		notifyLocked,
		puzzleData,
		puzzleState.values,
		setUserSuccess
	]);

	return (
		<Holder className={classes.puzzleHolder}>
			<Holder style={{ maxWidth: '75vw' }}>
				<Typography
					variant='h1'
					className={classes.title}
					style={{ fontSize: titleSize }}>
					A Jaunt About the Track
				</Typography>
			</Holder>
			<Holder className={classes.analogyHolder} direction='column'>
				<PnPill pChildren='windmill' nChildren='windbreaker' clearShadow mBot />
				{pillTransitions.map(
					({ item: { label, answer, swap }, props: newStyles, key }, index) => (
						<a.div style={newStyles} key={key}>
							<PnPill
								checkFunc={setSuccessHeader(
									getVal(puzzleState, index),
									getHash(puzzleData, index),
									bool =>
										actOnPuzzleState({
											index,
											type: bool ? 'setSuccess' : 'setFailure'
										})
								)}
								solved={getSuccess(puzzleState, index)}
								pChildren={
									!swap ? (
										label
									) : (
										<TextField
											value={getVal(puzzleState, index)}
											onChange={createSetter(actOnPuzzleState, index)}
											label={`analogy ${index + 1}`}
										/>
									)
								}
								swap={swap}
								mBot
								nChildren={
									swap ? (
										label
									) : (
										<TextField
											value={getVal(puzzleState, index)}
											onChange={createSetter(actOnPuzzleState, index)}
											label={`analogy ${index + 1}`}
										/>
									)
								}
							/>
						</a.div>
					)
				)}
			</Holder>
		</Holder>
	);
}

export default withPageFade(Puzzle3);
