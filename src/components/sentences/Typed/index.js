import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TypedJS from 'typed.js';

const styles = {
	type: {}
};

export default function Typed(props) {
	const {
		strings,
		shouldStart = true,
		typeSpeed = 111,
		startDelay = 700,
		backSpeed = 50,
		smartBackspace = true,
		shuffle = false,
		backDelay = 700,
		loop = false,
		loopCount = Infinity,
		showCursor = true,
		cursorChar = '|',
		onComplete = () => {},
		preStringTyped = () => {},
		onStringTyped = () => {},
		onLastStringBackspaced = () => {},
		onTypingPaused = () => {},
		onTypingResumed = () => {},
		onReset = () => {},
		onStop = () => {},
		onStart = () => {},
		onDestroy = () => {}
	} = props;
	const typedOptions = useRef({
		strings,
		typeSpeed,
		startDelay,
		backSpeed,
		smartBackspace,
		shuffle,
		backDelay,
		loop,
		loopCount,
		showCursor,
		cursorChar,
		onComplete,
		preStringTyped,
		onStringTyped,
		onLastStringBackspaced,
		onTypingPaused,
		onTypingResumed,
		onReset,
		onStop,
		onStart,
		onDestroy
	});
	const typedElement = useRef(null);
	const typed = useRef();
	useEffect(() => {
		if (shouldStart) {
			typed.current = new TypedJS(typedElement.current, typedOptions.current);
			return () => typed.current.destroy();
		}
	}, [typedOptions, shouldStart]);
	return <span style={styles.type} ref={typedElement} />;
}

Typed.propTypes = {
	strings: PropTypes.arrayOf(PropTypes.string).isRequired,
	shouldStart: PropTypes.bool,
	typeSpeed: PropTypes.number,
	startDelay: PropTypes.number,
	backSpeed: PropTypes.number,
	smartBackspace: PropTypes.bool,
	shuffle: PropTypes.bool,
	backDelay: PropTypes.number,
	loop: PropTypes.bool,
	loopCount: PropTypes.number,
	showCursor: PropTypes.bool,
	cursorChar: PropTypes.string,
	onComplete: PropTypes.func,
	preStringTyped: PropTypes.func,
	onStringTyped: PropTypes.func,
	onLastStringBackspaced: PropTypes.func,
	onTypingPaused: PropTypes.func,
	onTypingResumed: PropTypes.func,
	onReset: PropTypes.func,
	onStop: PropTypes.func,
	onStart: PropTypes.func,
	onDestroy: PropTypes.func
};
