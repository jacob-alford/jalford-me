import React from 'react';

import Button from '@material-ui/core/Button';

import Holder from 'components/words/Holder';

import useReactRouter from 'use-react-router';

import { themeHook } from 'theme';

import banner from './banner.svg';

const difficulties = {
  "easy":"#43a047",
  "medium":"#ffa000",
  "hard":"#d32f2f"
}
const bgDifficulty = {
  "easy":"#357e37",
  "medium":"#c77e00",
  "hard":"#a42323"
}

const getDifficulty = difficulty => difficulties[difficulty];
const getDifficultyBg = difficulty => bgDifficulty[difficulty];

const useClasses = themeHook(
  ['getPaperPadding'],
  ([paperPadding]) => ({
    paper:{
      background:({completed,difficulty}) => (completed) ? 'rgba(175,175,175,1)' : getDifficultyBg(difficulty),
      transition:'background .25s',
      padding:paperPadding,
      width:'175px',
      minHeight:'175px',
      margin:paperPadding,
      borderRadius:'8px',
      border: ({difficulty = "easy"}) => `solid 4px ${getDifficulty(difficulty) || ""}`
    },
    icon:{
      fontSize:'75px'
    },
    banner:{
      width:`${200 + 2 * parseInt(paperPadding,10) + 37}px`,
      position:'absolute',
      cursor:'pointer'
    },
    button:{
      color:'white',
      borderColor:'white'
    }
  })
);


export default function PuzzleCard(props){
  const { emoji , completed , link } = props;
  const { history } = useReactRouter();
  const classes = useClasses(props);
  return (
    <Holder className={classes.paper} justify='space-between'>
      <div className={`em-svg em-${emoji} ${classes.icon}`} />
      {(completed) ? (
        <img alt="success banner" src={banner} className={classes.banner} onClick={() => history.push(link)}/>
      ) : null}
      <Button variant="outlined" disabled={completed} className={classes.button} onClick={() => history.push(link)}>
        {(completed) ? "solved" : "solve"}
      </Button>
    </Holder>
  );
}
