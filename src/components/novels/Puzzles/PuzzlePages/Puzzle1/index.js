import React, { useReducer, useState, useEffect, useCallback } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Holder from 'components/words/Holder';

import SHA3 from 'crypto-js/sha3';
import AES from 'crypto-js/aes';
import UTF8Enc from 'crypto-js/enc-utf8';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import { reducer, comboBank, initialState } from './reduction.js';

import useClasses from './style.js';
import usePuzzleConnect from '../usePuzzleConnect.js';
import useRPuzzUpdate from '../useRPuzzUpdate.js';
import useNotify from 'components/bindings/hooks/useNotify';
import useLock from 'components/bindings/hooks/useLock';
import useTitleSize from 'components/bindings/hooks/useTitleSize';

const buttons = [
  ['leftInc', 'leftDec'],
  ['outerInc', 'outerDec'],
  ['rightInc', 'rightDec']
];

const strCat = (...str) => str.join(' ');
const createHandler = setter => evt => setter(evt.target.value);
const sha3Check = (test, str) => SHA3(test).toString() === str;
const setSuccessHeader = (test, str, setter) => () => {
  if (test && str && sha3Check(test, str)) setter(true);
  else setter(false);
};
const getRandomIncorrect = () =>
  [
    'Not correct',
    'That does not match',
    'Bad guess',
    'Does not comprehend',
    'AI shutting down',
    'Puzzle is NOT solved',
    'One or more symbols are incorrect',
    'RED TEXT',
    'A PROBLEM IS BELOW',
    'Try again, please',
    'Try again',
    '>=1 Symbol wrong'
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

const getPuzzleCipher = data => data && data.solution.cipher;
const getHintCiphers = data =>
  data && [data.hint1.cipher, data.hint2.cipher, data.hint3.cipher];

function Puzzle1() {
  const [puzzleState, actOnPuzzleState] = useReducer(reducer, initialState);
  const { puzzleData } = usePuzzleConnect('19-2-22');
  const { h1: titleSize } = useTitleSize();
  const screenTooSmall = useMediaQuery('(max-width: 500px)');
  const setUserSuccess = useRPuzzUpdate('19-2-22');
  const notify = useNotify({
    timeout: Infinity,
    alertType: 'success'
  });
  const [notifyLock, lockNotifications] = useLock(false);
  const [heading, setHeading] = useState('The Greek');
  const [hint1, setHint1] = useState('');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');
  const [hint1Valid, setHint1Valid] = useState(null);
  const [hint2Valid, setHint2Valid] = useState(null);
  const [hint3Valid, setHint3Valid] = useState(null);
  const classes = useClasses();
  const shuffle = () => actOnPuzzleState({ type: 'shuffle' });
  const checkCombo = useCallback(() => {
    const combo = puzzleState.join('_');
    const ciphers = getHintCiphers(puzzleData);
    if (ciphers) {
      try {
        const hintReturn = ciphers.reduce((acc, cipher) => {
          return acc || AES.decrypt(cipher, combo).toString(UTF8Enc);
        }, false);
        if (Boolean(hintReturn)) {
          setHeading(`*${hintReturn}`);
        } else {
          setHeading(`#${getRandomIncorrect()}`);
        }
      } catch (err) {
        setHeading(`#${getRandomIncorrect()}`);
      }
    }
  }, [puzzleData, puzzleState]);
  useEffect(() => {
    if (hint1Valid && hint2Valid && hint3Valid && !notifyLock) {
      try {
        const solution = AES.decrypt(
          getPuzzleCipher(puzzleData),
          `${hint1}${hint2}${hint3}`
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
    hint1,
    hint2,
    hint3,
    puzzleData,
    notify,
    notifyLock,
    lockNotifications,
    setUserSuccess
  ]);
  return (
    <Holder className={classes.superHolder}>
      <Holder>
        <Typography
          variant='h1'
          className={classes.title}
          style={{ fontSize: titleSize }}>
          {heading[0] === '*' ? (
            <span className={classes.sucessSpan}>{heading.substring(1)}</span>
          ) : heading[0] === '#' ? (
            <span className={classes.problemSpan}>{heading.substring(1)}</span>
          ) : (
            <span>{heading}</span>
          )}
        </Typography>
      </Holder>
      <Holder justify='space-evenly' direction='row'>
        {puzzleState.map((item, index) => (
          <Holder
            key={`puzzleItem${index}`}
            className={classes.letterHolder}
            style={{ margin: screenTooSmall ? '0px' : null }}>
            <Typography key={`${item}${index}`} variant='h2'>
              <span dangerouslySetInnerHTML={{ __html: comboBank[item] }} />
            </Typography>
          </Holder>
        ))}
      </Holder>
      <Holder direction='row'>
        {buttons.map((btn, index) => (
          <Holder
            key={`actionSet${index}`}
            className={`${classes.operatorHolder} ${classes[`bg${index + 1}`]}`}
            style={{ margin: screenTooSmall ? '0px' : null }}>
            {btn.map((actBtn, subIndex) => (
              <React.Fragment key={`subActionSet${actBtn}`}>
                <Button
                  style={{ color: 'rgba(255,255,255,1)' }}
                  className={classes.btnOperator}
                  onClick={() => actOnPuzzleState({ type: actBtn })}>
                  {subIndex % 2 === 0 ? '+' : '-'}
                </Button>
                {subIndex === 0 ? <div className={classes.divider} /> : null}
              </React.Fragment>
            ))}
          </Holder>
        ))}
      </Holder>
      <Holder direction='row'>
        <ButtonGroup className={classes.checkButton}>
          <Button variant='outlined' onClick={checkCombo}>
            Check
          </Button>
          <Button variant='outlined' onClick={shuffle}>
            Shuffle
          </Button>
        </ButtonGroup>
      </Holder>
      <div className={strCat(classes.divider, classes.vertSpacing)} />
      <Holder className={classes.fieldHolder} direction='row'>
        <Holder className={classes.hintGroup}>
          <Typography
            variant='h2'
            className={classes.fieldTitle}
            style={{
              color:
                hint1Valid === true ? '#357e37' : hint1Valid === false ? '#d32f2f' : null
            }}>
            οζι
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
              color:
                hint2Valid === true ? '#357e37' : hint2Valid === false ? '#d32f2f' : null
            }}>
            βφκ
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
              color:
                hint3Valid === true ? '#357e37' : hint3Valid === false ? '#d32f2f' : null
            }}>
            πυυ
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
      </Holder>
    </Holder>
  );
}

export default withPageFade(Puzzle1);
