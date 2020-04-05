import React, { useState, useRef, useEffect, useReducer, useCallback } from 'react';
import OpenSeadragon from 'openseadragon';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Fullscreen from '@material-ui/icons/Fullscreen';

import Loader from 'components/words/Loader';
import Holder from 'components/words/Holder';

import SHA3 from 'crypto-js/sha3';
import AES from 'crypto-js/aes';
import UTF8Enc from 'crypto-js/enc-utf8';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useClasses from './style.js';
import usePuzzleConnect from '../usePuzzleConnect.js';
import useRPuzzUpdate from '../useRPuzzUpdate.js';
import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useNotify from 'components/bindings/hooks/useNotify';
import useLock from 'components/bindings/hooks/useLock';

import { detectMobile } from 'functions';

import { reducer, initialState } from './reduction.js';

const strCat = (...str) => str.join(' ');
const createHandler = setter => evt => setter(evt.target.value);
const sha3Check = (test, str) => SHA3(test).toString() === str;
const setSuccessHeader = (test, str, setter) => () => {
	if (test && str && sha3Check(test, str)) setter(true);
	else setter(false);
};
const getRandomIncorrect = date =>
	[
		`Is ${date} even a date?`,
		'No comprende seÑor',
		'That is not correctemundo',
		'Lacks kosher-ness',
		'1-4 is wrong, one of them, or many of them',
		'Try again',
		'Wrong.',
		'Wroooongg',
		'V. Bad.',
		'INSERT WRONG MSG HERE',
		'Eleventh message',
		'Just plane wrong.  Zoom'
	][(Math.random() * 12) | 0];
const getRandomSolIncorrect = () =>
	[
		`Don't you see the red?`,
		'What about all that red',
		`I've heard the phrase seeing red, but give me a break`,
		'One or more hints are incorrect',
		'hints are wrong',
		'in the wise words of Obi Wan Kanobe, make like a tree and the puzzle is wrong.'
	][(Math.random() * 12) | 0];

const getH1Hash = data => data && data.hint1.hash;
const getH2Hash = data => data && data.hint2.hash;
const getH3Hash = data => data && data.hint3.hash;
const getH4Hash = data => data && data.hint4.hash;

const getPuzzleCipher = data => data && data.solution.cipher;
const getHintCiphers = data =>
	data && [data.hint1.cipher, data.hint2.cipher, data.hint3.cipher, data.hint4.cipher];

function Puzzle2(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [puzzleState, actOnPuzzleState] = useReducer(reducer, initialState);
	const { puzzleData } = usePuzzleConnect('19-2-26');
	const [notifyLock, lockNotifications] = useLock(false);

	const setUserSuccess = useRPuzzUpdate('19-2-26');
	const notify = useNotify({
		timeout: Infinity,
		alertType: 'success'
	});

	const [hint1Valid, setHint1Valid] = useState(null);
	const [hint2Valid, setHint2Valid] = useState(null);
	const [hint3Valid, setHint3Valid] = useState(null);
	const [hint4Valid, setHint4Valid] = useState(null);

	const [hint1, setHint1] = useState('');
	const [hint2, setHint2] = useState('');
	const [hint3, setHint3] = useState('');
	const [hint4, setHint4] = useState('');

	const [heading, setHeading] = useState('History is Key');
	const { h1: titleSize } = useTitleSize();
	const isMobile = useRef(detectMobile());
	const screenTooSmall = useMediaQuery('(max-width: 500px)');

	const viewer = useRef(null);
	const viewerEl = useRef();
	const classes = useClasses(props);
	useEffect(() => {
		if (viewerEl.current) {
			viewer.current = OpenSeadragon({
				element: viewerEl.current,
				tileSources: {
					type: 'zoomifytileservice',
					width: 6265,
					height: 4581,
					tilesUrl: '/publicAssets/Lamgods_open/'
				},
				immediateRender: true,
				showNavigator: true,
				preload: true,
				showNavigationControl: false,
				defaultZoomLevel: 1
			});
			viewer.current.addOnceHandler('open', () => setIsLoading(false));
		}
	}, []);
	useEffect(() => {
		if (hint1Valid && hint2Valid && hint3Valid && hint4Valid && !notifyLock) {
			try {
				const solution = AES.decrypt(
					getPuzzleCipher(puzzleData),
					`${hint1}${hint2}${hint3}${hint4}`
				).toString(UTF8Enc);
				if (Boolean(solution)) {
					lockNotifications();
					setHeading(`*You did it!`);
					notify({
						body: solution
					});
					setUserSuccess();
				} else setHeading(`#${getRandomSolIncorrect()}`);
			} catch (err) {
				console.error(err);
				setHeading(`#${getRandomSolIncorrect()}`);
			}
		}
	}, [
		hint1Valid,
		hint2Valid,
		hint3Valid,
		hint4Valid,
		hint1,
		hint2,
		hint3,
		hint4,
		puzzleData,
		notify,
		notifyLock,
		lockNotifications,
		setUserSuccess
	]);
	const checkCombo = useCallback(() => {
		const combo = puzzleState.join('_');
		const ciphers = getHintCiphers(puzzleData);
		if (ciphers) {
			try {
				const hintReturn = ciphers.reduce((acc, cipher) => {
					try {
						return acc || AES.decrypt(cipher, combo).toString(UTF8Enc);
					} catch (err) {
						return acc;
					}
				}, false);
				if (Boolean(hintReturn)) {
					setHeading(`*${hintReturn}`);
				} else {
					setHeading(`#${getRandomIncorrect(puzzleState.join(''))}`);
				}
			} catch (err) {
				console.log('error?', err);
				setHeading(`#${getRandomIncorrect(puzzleState.join(''))}`);
			}
		}
	}, [puzzleData, puzzleState]);
	return (
		<Holder className={classes.puzzleHolder}>
			{isLoading ? <Loader /> : null}
			<div
				id='puzzle2OSDViewer'
				ref={viewerEl}
				className={classes.viewer}
				style={{ display: isLoading ? 'none' : null }}></div>
			{!isLoading ? (
				<React.Fragment>
					<Holder className={classes.toolBarHolder} justify='flex-end' direction='row'>
						{!isMobile.current ? (
							<IconButton onClick={() => viewer.current && viewer.current.setFullScreen(true)}>
								<Fullscreen />
							</IconButton>
						) : null}
					</Holder>
					<Holder style={{ maxWidth: '75vw' }}>
						<Typography variant='h1' className={classes.title} style={{ fontSize: titleSize }}>
							{heading[0] === '*' ? (
								<span className={classes.sucessSpan}>{heading.substring(1)}</span>
							) : heading[0] === '#' ? (
								<span className={classes.problemSpan}>{heading.substring(1)}</span>
							) : (
								<span>{heading}</span>
							)}
						</Typography>
					</Holder>
					<Holder className={classes.listHolder}>
						<List>
							<ListItem>
								<ListItemIcon>
									<div className={`em-svg em-us ${classes.icon}`} />
								</ListItemIcon>
								<ListItemText primary='The Unanimous Declaration of the Thirteen' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<div className={`em-svg em-gb ${classes.icon}`} />
								</ListItemIcon>
								<ListItemText primary='The Great Charter of Liberties' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<div className={`em-svg em-fr ${classes.icon}`} />
								</ListItemIcon>
								<ListItemText primary='Révolution Française' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<div className={`em-svg em-skull ${classes.icon}`} />
								</ListItemIcon>
								<ListItemText primary='Dissolution of the Soviet Union' />
							</ListItem>
						</List>
					</Holder>
					<Holder direction='row'>
						{puzzleState.map((item, index) => (
							<Holder key={`actionIncDec${index}`}>
								<Holder>
									<Typography
										variant='h2'
										className={classes.digit}
										style={{ fontSize: titleSize }}>
										{item}
									</Typography>
								</Holder>
								<Holder
									key={`incDec${index}`}
									className={`${classes.operatorHolder} ${classes[`bg${index + 1}`]}`}
									style={{ margin: screenTooSmall ? '0px' : null }}>
									<Button
										style={{ color: 'rgba(255,255,255,1)' }}
										className={classes.btnOperator}
										onClick={() => actOnPuzzleState({ type: 'increment', index: index })}>
										+
									</Button>
									<div className={classes.divider} />
									<Button
										style={{ color: 'rgba(255,255,255,1)' }}
										className={classes.btnOperator}
										onClick={() => actOnPuzzleState({ type: 'decrement', index: index })}>
										-
									</Button>
								</Holder>
							</Holder>
						))}
					</Holder>
					<Holder>
						<Button variant='outlined' onClick={checkCombo} className={classes.checkButton}>
							Check
						</Button>
					</Holder>
					<div className={strCat(classes.divider, classes.vertSpacing)} />
					<Holder className={classes.fieldHolder} direction='row'>
						<Holder className={classes.hintGroup}>
							<Typography
								variant='h2'
								className={classes.fieldTitle}
								style={{
									color: hint1Valid === true ? '#357e37' : hint1Valid === false ? '#d32f2f' : null
								}}>
								1
							</Typography>
							<TextField
								label='Hint 1'
								onChange={createHandler(setHint1)}
								value={hint1}
								className={classes.textField}
							/>
							<Button
								variant='outlined'
								onClick={setSuccessHeader(hint1, getH1Hash(puzzleData), setHint1Valid)}>
								Check
							</Button>
						</Holder>
						<Holder className={classes.hintGroup}>
							<Typography
								variant='h2'
								className={classes.fieldTitle}
								style={{
									color: hint2Valid === true ? '#357e37' : hint2Valid === false ? '#d32f2f' : null
								}}>
								2
							</Typography>
							<TextField
								label='Hint 2'
								onChange={createHandler(setHint2)}
								value={hint2}
								className={classes.textField}
							/>
							<Button
								variant='outlined'
								onClick={setSuccessHeader(hint2, getH2Hash(puzzleData), setHint2Valid)}>
								Check
							</Button>
						</Holder>
						<Holder className={classes.hintGroup}>
							<Typography
								variant='h2'
								className={classes.fieldTitle}
								style={{
									color: hint3Valid === true ? '#357e37' : hint3Valid === false ? '#d32f2f' : null
								}}>
								3
							</Typography>
							<TextField
								label='Hint 3'
								onChange={createHandler(setHint3)}
								value={hint3}
								className={classes.textField}
							/>
							<Button
								variant='outlined'
								onClick={setSuccessHeader(hint3, getH3Hash(puzzleData), setHint3Valid)}>
								Check
							</Button>
						</Holder>
						<Holder className={classes.hintGroup}>
							<Typography
								variant='h2'
								className={classes.fieldTitle}
								style={{
									color: hint4Valid === true ? '#357e37' : hint4Valid === false ? '#d32f2f' : null
								}}>
								4
							</Typography>
							<TextField
								label='Hint 4'
								onChange={createHandler(setHint4)}
								value={hint4}
								className={classes.textField}
							/>
							<Button
								variant='outlined'
								onClick={setSuccessHeader(hint4, getH4Hash(puzzleData), setHint4Valid)}>
								Check
							</Button>
						</Holder>
					</Holder>
				</React.Fragment>
			) : null}
		</Holder>
	);
}

export default withPageFade(Puzzle2);
