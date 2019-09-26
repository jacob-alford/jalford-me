import React , { useReducer , useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Holder from 'components/words/Holder';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import { reducer , comboBank , initialState } from './reduction.js';

import useClasses from './style.js';

const buttons = [
  ['leftInc','leftDec'],
  ['outerInc','outerDec'],
  ['rightInc','rightDec']
];

const strCat = (...str) => str.join(" ");

function Puzzle1(){
  const [puzzleState,actOnPuzzleState] = useReducer(reducer,initialState);
  const [heading,setHeading] = useState("February 22")
  const [hint1,setHint1] = useState("");
  const [hint2,setHint2] = useState("");
  const [hint3,setHint3] = useState("");
  const [hint1Valid,setHint1Valid] = useState(false);
  const [hint2Valid,setHint2Valid] = useState(false);
  const [hint3Valid,setHint3Valid] = useState(false);
  const createHandler = setter => evt => setter(evt.target.value);
  const classes = useClasses();
  return (
    <Holder className={classes.superHolder}>
      <Holder>
        <Typography variant="h1" className={classes.title}>
          {heading}
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
          <Typography variant="h2" className={classes.fieldTitle} style={{color:(hint1Valid) ? '#357e37' : null}}>
            οζι
          </Typography>
          <TextField label="Hint 1" onChange={createHandler(setHint1)} value={hint1} className={classes.textField}/>
          <Button variant="outlined">
            Check
          </Button>
        </Holder>
        <Holder className={classes.hintGroup}>
          <Typography variant="h2" className={classes.fieldTitle} style={{color:(hint1Valid) ? '#357e37' : null}}>
            βφκ
          </Typography>
          <TextField label="Hint 2" onChange={createHandler(setHint2)} value={hint2} className={classes.textField} />
          <Button variant="outlined">
            Check
          </Button>
        </Holder>
        <Holder className={classes.hintGroup}>
          <Typography variant="h2" className={classes.fieldTitle} style={{color:(hint1Valid) ? '#357e37' : null}}>
            πυυ
          </Typography>
          <TextField label="Hint 3" onChange={createHandler(setHint3)} value={hint3} className={classes.textField} />
          <Button variant="outlined">
            Check
          </Button>
        </Holder>
      </Holder>
    </Holder>
  );
}

export default withPageFade(Puzzle1);
