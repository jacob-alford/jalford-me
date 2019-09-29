import React , { useReducer , useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Holder from 'components/words/Holder';

import useClasses from './style.js';
import useTitleSize from 'components/bindings/hooks/useTitleSize';

import { reducer , initialState } from './reduction.js';

import PnPill from './PnPill.js';

const getVal = (state,index) => state.values[index];
const createSetter = (actor,index) => evt => actor({type:"setVal",val:evt.target.value,index});

const pills = [
  {swap:true,label:"Heartbreak"}, // Heartfelt
  {label:"Suntan"}, //Sunburn
  {swap:true,label:"Antibiotics"}, // Probiotics
  {label:"Rested"}, // Restless
  {swap:true,label:"Apologist"}, // Apologize
  {label:"Ale"} // Ail
];
export default function Puzzle3(){
  const classes = useClasses();
  const [heading,setHeading] = useState("March 3");
  const { h1:titleSize } = useTitleSize();
  const [puzzleState,actOnPuzzleState] =
    useReducer(reducer,initialState);
  return (
    <Holder className={classes.puzzleHolder}>
      <Holder style={{maxWidth:'75vw'}}>
        <Typography variant="h1" className={classes.title} style={{fontSize:titleSize}}>
          {(heading[0] === "*") ?
            <span className={classes.sucessSpan}>{heading.substring(1)}</span>
          : (heading[0] === "#") ?
            <span className={classes.problemSpan}>{heading.substring(1)}</span>
          : <span>{heading}</span>
          }
        </Typography>
      </Holder>
      <Holder className={classes.analogyHolder} direction="column">
        <PnPill pChildren="Windmill" nChildren="Windbreaker" clearShadow mBot/>
        {pills.map(
          ({label,answer,swap},index) => (
            <PnPill
              pChildren={
                (!swap) ?
                label
              : (<TextField
                  value={getVal(puzzleState,index)}
                  onChange={createSetter(actOnPuzzleState,index)}
                  label={`Analogy ${index + 1}`}/>)
              }
              swap={swap}
              mBot
              nChildren={
                (swap) ?
                label
              : (<TextField
                  value={getVal(puzzleState,index)}
                  onChange={createSetter(actOnPuzzleState,index)}
                  label={`Analogy ${index + 1}`}/>)
              }/>
          )
        )}
      </Holder>
    </Holder>
  );
}
