import React , { useReducer , useState , useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Holder from 'components/words/Holder';

import SHA3 from 'crypto-js/sha3';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import { reducer , comboBank , initialState } from './reduction.js';

import useClasses from './style.js';
import usePuzzleConnect from '../usePuzzleConnect.js';

const buttons = [
  ['leftInc','leftDec'],
  ['outerInc','outerDec'],
  ['rightInc','rightDec']
];

const strCat = (...str) => str.join(" ");
const createHandler = setter => evt => setter(evt.target.value);
const sha3Check = (test,str) => SHA3(test).toString() === str;

const getH1Hash = data => data && data.hint1.hash;
const getH2Hash = data => data && data.hint2.hash;
const getH3Hash = data => data && data.hint3.hash;

function Puzzle1(){
  const [puzzleState,actOnPuzzleState] = useReducer(reducer,initialState);
  const { isLoading , puzzleData } = usePuzzleConnect('19-2-22');
  const [heading,setHeading] = useState("February 22");
  const [hint1,setHint1] = useState("");
  const [hint2,setHint2] = useState("");
  const [hint3,setHint3] = useState("");
  const [hint1Valid,setHint1Valid] = useState(null);
  const [hint2Valid,setHint2Valid] = useState(null);
  const [hint3Valid,setHint3Valid] = useState(null);
  const classes = useClasses();
  const setSuccessHeader = (test,str,setter) => () => {
    if(test && str && sha3Check(test,str))
      setter(true);
    else setter(false);
  }
  useEffect(() => {
    if(hint1Valid && hint2Valid && hint3Valid)
      console.log("Finished puzzle!!!  Decrypt solution.");
  },[hint1Valid,hint2Valid,hint3Valid]);
  return (
    <Holder className={classes.superHolder}>
      <Holder>
        <Typography variant="h1" className={classes.title}>
          {(heading[0] === "*") ?
            <span className={classes.sucessSpan}>{heading.substring(1)}</span>
          : <span>{heading}</span>
          }
        </Typography>
      </Holder>
      <Holder justify="space-evenly" direction="row">
        {puzzleState.map((item,index) => (
          <Holder key={`puzzleItem${index}`} className={classes.letterHolder}>
            <Typography key={`${item}${index}`} variant="h2">
              <span dangerouslySetInnerHTML={{__html:comboBank[item]}} />
            </Typography>
          </Holder>
        ))}
      </Holder>
      <Holder direction="row">
        {buttons.map((btn,index) => (
          <Holder key={`actionSet${index}`} className={`${classes.operatorHolder} ${classes[`bg${index + 1}`]}`}>
            {btn.map((actBtn,subIndex) => (
              <React.Fragment key={`subActionSet${actBtn}`}>
                <Button  style={{color:'rgba(255,255,255,1)'}} className={classes.btnOperator} onClick={() => actOnPuzzleState({type:actBtn})}>
                  {(subIndex % 2 === 0) ? '+' : '-'}
                </Button>
                {(subIndex === 0) ? <div className={classes.divider} /> : null}
              </React.Fragment>
            ))}
          </Holder>
        ))}
      </Holder>
      <Holder>
        <Button variant="outlined" className={classes.checkButton}>
          Check
        </Button>
      </Holder>
      <div className={strCat(classes.divider,classes.vertSpacing)} />
      <Holder className={classes.fieldHolder} direction="row">
        <Holder className={classes.hintGroup}>
          <Typography variant="h2" className={classes.fieldTitle} style={{
            color:(hint1Valid === true) ?
              '#357e37'
            : (hint1Valid === false) ?
              '#d32f2f'
            : null
          }}>
            οζι
          </Typography>
          <TextField label="Hint 1" onChange={createHandler(setHint1)} value={hint1} className={classes.textField}/>
          <Button variant="outlined" onClick={setSuccessHeader(hint1,getH1Hash(puzzleData),setHint1Valid)}>
            Check
          </Button>
        </Holder>
        <Holder className={classes.hintGroup}>
          <Typography variant="h2" className={classes.fieldTitle} style={{
            color:(hint2Valid === true) ?
              '#357e37'
            : (hint2Valid === false) ?
              '#d32f2f'
            : null
          }}>
            βφκ
          </Typography>
          <TextField label="Hint 2" onChange={createHandler(setHint2)} value={hint2} className={classes.textField} />
          <Button variant="outlined" onClick={setSuccessHeader(hint2,getH2Hash(puzzleData),setHint2Valid)}>
            Check
          </Button>
        </Holder>
        <Holder className={classes.hintGroup}>
          <Typography variant="h2" className={classes.fieldTitle} style={{
            color:(hint3Valid === true) ?
              '#357e37'
            : (hint3Valid === false) ?
              '#d32f2f'
            : null
          }}>
            πυυ
          </Typography>
          <TextField label="Hint 3" onChange={createHandler(setHint3)} value={hint3} className={classes.textField} />
          <Button variant="outlined" onClick={setSuccessHeader(hint3,getH3Hash(puzzleData),setHint3Valid)}>
            Check
          </Button>
        </Holder>
      </Holder>
    </Holder>
  );
}

export default withPageFade(Puzzle1);
