import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useSprings, animated as a } from 'react-spring';
import { ParallaxBanner } from 'react-scroll-parallax';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PanTool from '@material-ui/icons/PanTool';

import useColorAdapt from 'components/bindings/hooks/useColorAdapt';
import useRedirect from 'components/bindings/hooks/useRedirect';

const styles = {
	banner: {
		height: '100vh',
		maxHeight: '1500px'
	},
	container: {
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		width: '100vw',
		height: '100%',
		display: 'flex',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	subContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'nowrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	paragraph: {
		maxWidth: '200px'
	},
	button: {
		color: '#58E855',
		backgroundColor: 'rgba(0,0,0,.5)',
		borderColor: '#58E855',
		transition: 'color .4s border-color .4s'
	},
	colorCircle: {
		width: '50px',
		height: '50px',
		borderRadius: '26px',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		cursor: 'grab',
		backgroundClip: 'content-box',
		backgroundSize: '100% 100%',
		transition: 'color .4s border-color .4s',
		touchAction: 'none'
	},
	circleEphemeral: {
		opacity: 0.5,
		background: 'rgba(0,0,0,.39)'
	},
	circleHolder: {
		height: '100%'
	},
	refresh: {
		cursor: 'pointer',
		marginTop: '16px'
	},
	circleGroup: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '75px',
		height: '150px',
		marginLeft: '-38px'
	},
	bgCanvas: {
		width: '100vw',
		height: '100vh'
	}
};

const colors = [
	['#1E9600', '#FFF200', '#FF0000'],
	['#40E0D0', '#FF8C00', '#FF0000'],
	['#1a2a6c', '#b21f1f', '#FF0000'],
	['#833ab4', '#fd1d1d', '#fcb045'],
	['#77A1D3', '#79CBCA', '#fcb045'],
	['#12c2e9', '#c471ed', '#fcb045'],
	['#C6FFDD', '#FBD786', '#fcb045'],
	['#8A2387', '#E94057', '#fcb045']
];

const randomColorArr = () => colors[(Math.random() * colors.length) | 0];

const toRGBA = (hex, alpha = 1) => {
	let wrkHex;
	if (hex.includes('#')) wrkHex = hex.substring(1);
	else wrkHex = hex;
	const gInt = val => parseInt(val, 16);
	let wRGB;
	if (wrkHex.length === 3)
		wRGB = [
			gInt(`${wrkHex[0]}${wrkHex[0]}`),
			gInt(`${wrkHex[1]}${wrkHex[1]}`),
			gInt(`${wrkHex[2]}${wrkHex[2]}`)
		];
	else
		wRGB = [
			gInt(`${wrkHex[0]}${wrkHex[1]}`),
			gInt(`${wrkHex[2]}${wrkHex[3]}`),
			gInt(`${wrkHex[4]}${wrkHex[5]}`)
		];
	return `rgba(${wRGB[0]},${wRGB[1]},${wRGB[2]},${alpha})`;
};
const isEqual = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
};

const ColorCircle = props => {
	const { color, bgColor, onDragStart, onTouchStart } = props;
	const textColor = useColorAdapt(color);
	const borderColor = useColorAdapt(bgColor);
	return (
		<div
			onDragStart={onDragStart}
			onTouchStart={onTouchStart}
			draggable
			style={{
				...styles.colorCircle,
				borderColor: borderColor,
				backgroundColor: color
			}}>
			<PanTool style={{ color: textColor }} />
		</div>
	);
};

const getYTouchOffset = (touch1, touch2) => {
	if (touch2 && touch2.clientY && touch1 && touch1.clientY)
		return touch2.clientY - touch1.clientY;
	else return 0;
};

const CircleHolder = props => {
	const { colorState, colorDispatch, setHasSolved } = props;

	const clientIOS = useRef(/(iPad|iPhone|iPod)/g.test(navigator.userAgent));
	const currentDrag = useRef(null);
	const isMoving = useRef(false);
	const initialTouch = useRef(null);
	const touchHandlers = useRef([React.createRef(), React.createRef(), React.createRef()]);

	const handleDragStart = (evt, visibleIndex) => {
		if (!getColorByVI(colorState, visibleIndex).ephemeral) {
			colorDispatch({
				type: 'toggleEphemeral',
				payload: { index: visibleIndex }
			});
			evt.dataTransfer.setData('ThanksFirefox', '');
			currentDrag.current = visibleIndex;
		}
	};
	const handleTouchStart = (evt, visibleIndex) => {
		if (!getColorByVI(colorState, visibleIndex).ephemeral) {
			colorDispatch({
				type: 'toggleEphemeral',
				payload: { index: visibleIndex }
			});
			initialTouch.current = evt.changedTouches[0];
		}
	};
	const handleTouchMove = (evt, visibleIndex) => {
		const offset = getYTouchOffset(initialTouch.current, evt.changedTouches[0]);
		const swapWith = (offset / (window.innerHeight * 0.175)) | 0;
		if (swapWith >= 1) {
			const swapStr = visibleIndex === 0 ? `01` : visibleIndex === 1 ? `12` : null;
			if (swapStr) {
				colorDispatch({ type: `swap${swapStr}` });
				initialTouch.current = evt.changedTouches[0];
			}
		} else if (swapWith <= -1) {
			const swapStr = visibleIndex === 1 ? `01` : visibleIndex === 2 ? `12` : null;
			if (swapStr) {
				colorDispatch({ type: `swap${swapStr}` });
				initialTouch.current = evt.changedTouches[0];
			}
		}
	};
	const handleDragEnd = visibleIndex => {
		if (getColorByVI(colorState, visibleIndex).ephemeral) {
			colorDispatch({
				type: 'toggleEphemeral',
				payload: { index: visibleIndex }
			});
			currentDrag.current = null;
			isMoving.current = false;
		}
	};
	const handleTouchEnd = (evt, visibleIndex) => {
		if (getColorByVI(colorState, visibleIndex).ephemeral) {
			colorDispatch({
				type: 'toggleEphemeral',
				payload: { index: visibleIndex }
			});
			initialTouch.current = null;
		}
	};
	const handleDragOver = (evt, dropVisibleIndex) => {
		const visibleIndex = currentDrag.current;
		if (
			typeof visibleIndex === 'number' &&
			!Number.isNaN(visibleIndex) &&
			typeof dropVisibleIndex === 'number' &&
			!Number.isNaN(dropVisibleIndex) &&
			visibleIndex !== dropVisibleIndex &&
			isMoving.current === false
		) {
			isMoving.current = true;
			currentDrag.current = dropVisibleIndex;
			const string = [visibleIndex, dropVisibleIndex]
				.sort((item1, item2) => item1 - item2)
				.join('');
			colorDispatch({ type: `swap${string}` });
		}
	};

	useEffect(() => {
		if (isEqual(getYs(colorState), [75, 50, 25])) setHasSolved(true);
		else setHasSolved(false);
	}, [colorState, setHasSolved]);

	useEffect(() => {
		if (clientIOS.current === true) {
			const touchers = touchHandlers.current;
			touchers.forEach(toucher => {
				toucher.current.addEventListener('touchmove', e => e.preventDefault(), {
					passive: false
				});
				toucher.current.addEventListener('touchstart', e => e.preventDefault(), {
					passive: false
				});
			});
			return () => {
				touchers.forEach(toucher => {
					toucher.current.removeEventListener('touchmove', e => e.preventDefault());
					toucher.current.removeEventListener('touchstart', e => e.preventDefault());
				});
			};
		}
	}, [touchHandlers]);

	const circleSprings = useSprings(
		colorState.length,
		colorState.map(item => {
			return {
				y: item.y,
				config: {
					tension: 200,
					friction: 12
				}
			};
		})
	);

	return circleSprings.map((spring, index) => {
		const { ephemeral, visibleIndex, color } = colorState[index];
		const { y } = spring;
		return (
			<a.div
				style={
					!ephemeral
						? {
								...styles.circleGroup,
								top: y.interpolate(newY => `calc(${newY}% - 101px)`)
						  }
						: {
								...styles.circleGroup,
								...styles.circleEphemeral,
								top: y.interpolate(newY => `calc(${newY}% - 101px`)
						  }
				}
				ref={touchHandlers.current[index]}
				onDragEnter={evt => handleDragOver(evt, visibleIndex)}
				onDragEnd={() => handleDragEnd(visibleIndex)}
				onTouchEnd={evt => handleTouchEnd(evt, visibleIndex)}
				onTouchMove={evt => handleTouchMove(evt, visibleIndex)}
				onTouchCancel={evt => handleTouchEnd(evt, visibleIndex)}
				key={`circle${index}`}>
				<ColorCircle
					color={color}
					bgColor={getColors(colorState)[2]}
					onDragStart={evt => handleDragStart(evt, visibleIndex)}
					onTouchStart={evt => handleTouchStart(evt, visibleIndex)}
				/>
			</a.div>
		);
	});
};

const colorKey = randomColorArr();
// 75 50 25
const initialOrientation = [
	[25, 50, 75],
	[25, 75, 50],
	[75, 25, 50],
	[50, 25, 75],
	[50, 75, 25]
][(Math.random() * 5) | 0];

const initialState = colorKey.map((key, index) => {
	return {
		index: index,
		color: key,
		visibleIndex: initialOrientation[index] / 25 - 1,
		y: initialOrientation[index],
		ephemeral: false
	};
});

const toggleEphemeral = (state, index) => {
	const copyArr = [...state];
	const item = copyArr.find(item => item.visibleIndex === index);
	copyArr[copyArr.indexOf(item)].ephemeral = !copyArr[copyArr.indexOf(item)].ephemeral;
	return copyArr;
};

const swapYs = (state, index1, index2) => {
	const copyArr = [...state];
	const item1 = copyArr.find(item => item.visibleIndex === index1);
	const item2 = copyArr.find(item => item.visibleIndex === index2);
	const { y: y1, visibleIndex: v1 } = item1;
	const { y: y2, visibleIndex: v2 } = item2;
	copyArr[copyArr.indexOf(item1)].y = y2;
	copyArr[copyArr.indexOf(item1)].visibleIndex = v2;
	copyArr[copyArr.indexOf(item2)].y = y1;
	copyArr[copyArr.indexOf(item2)].visibleIndex = v1;
	return copyArr;
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'swap01':
			return swapYs(state, 0, 1);
		case 'swap02':
			return swapYs(state, 0, 2);
		case 'swap12':
			return swapYs(state, 1, 2);
		case 'toggleEphemeral':
			return toggleEphemeral(state, action.payload.index);
		default:
			throw new Error('Undefined action in reducer in PuzzleFeatured!');
	}
};

const imageLayer = [{ children: <div style={styles.bgCanvas} />, amount: 0.1 }];

const getColors = state => state.map(item => item.color);
const getYs = state => state.map(item => item.y);
const getColorByVI = (state, VI) => state.find(item => item.visibleIndex === VI);

export default function PuzzleFeatured(props) {
	const handleOnClick = useRedirect('/puzzles');

	let canvasHolder = React.createRef();

	const [colorState, dispatchColorChange] = useReducer(reducer, initialState);

	const textColor = useColorAdapt(getColors(colorState)[1]);
	const [hasSolved, setHasSolved] = useState(false);

	return (
		<ParallaxBanner
			style={{
				...styles.banner,
				background: `linear-gradient(to top left, ${getColors(colorState).join(',')})`
			}}
			layers={imageLayer}>
			<div style={styles.container} ref={canvasHolder}>
				<div style={styles.paragraph}>
					<div style={styles.subContainer}>
						<Typography variant='h2' paragraph style={{ color: textColor }}>
							Puzzles
						</Typography>
						<Typography
							variant='body1'
							paragraph
							style={{ textAlign: 'center', color: textColor }}>
							Strain your faculties; wallow in the minutia; soundly solved.
						</Typography>
						<Button
							style={
								hasSolved
									? styles.button
									: {
											color: toRGBA(textColor, 0.75),
											borderColor: toRGBA(textColor, 0.35)
									  }
							}
							variant='outlined'
							disabled={!hasSolved}
							onClick={handleOnClick}>
							{hasSolved ? 'Proceed to Puzzles' : 'Solve to Proceed'}
						</Button>
					</div>
				</div>
				<div style={styles.circleHolder}>
					<CircleHolder
						setHasSolved={setHasSolved}
						colorState={colorState}
						colorDispatch={dispatchColorChange}
					/>
				</div>
			</div>
		</ParallaxBanner>
	);
}
