import React , { useEffect } from 'react';
import PropTypes from 'prop-types';
import TypedJS from 'typed.js';

const styles = {
  type:{

  }
}

export default function Typed(props){
  const {
    strings,
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
  const typedOptions = {
    strings, typeSpeed, startDelay,
    backSpeed, smartBackspace, shuffle,
    backDelay, loop, loopCount,
    showCursor, cursorChar, onComplete,
    preStringTyped, onStringTyped,
    onLastStringBackspaced, onTypingPaused,
    onTypingResumed, onReset, onStop,
    onStart, onDestroy
  }
  const typedElement = React.createRef();
  let typed;
  useEffect(() => {
    if(typedElement) typed = new TypedJS(typedElement.current,typedOptions);
    return () => typed.destroy();
  },[typed]);
  return <span style={styles.type} ref={typedElement}/>;
}

Typed.propTypes = {
  strings: PropTypes.arrayOf(PropTypes.string).isRequired,
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
}
