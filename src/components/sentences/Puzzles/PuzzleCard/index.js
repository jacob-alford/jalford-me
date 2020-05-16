import React from 'react';

import Typography from '@material-ui/core/Typography';

import Button, { types } from 'components/words/AlfordButton/AlfordButton';
import Holder from 'components/words/Holder';

import { useHistory } from 'react-router-dom';

import { themeHook } from 'theme';

import banner from './banner.svg';

import C from 'theme-constants';

const difficulties = {
  easy: C.success,
  medium: C.warn,
  hard: C.danger
};
const bgDifficulty = {
  easy: C.success,
  medium: C.warn,
  hard: C.danger
};

const getDifficulty = difficulty => difficulties[difficulty];
const getDifficultyBg = difficulty => bgDifficulty[difficulty];

const useClasses = themeHook(['getPaperPadding'], ([paperPadding]) => ({
  paper: {
    background: ({ difficulty }) => getDifficultyBg(difficulty),
    transition: 'background .25s',
    padding: C.spacing(0),
    cursor: 'pointer',
    width: '175px',
    minHeight: '175px',
    margin: C.spacing(1),
    marginTop: 0,
    border: ({ difficulty = 'easy' }) => `solid 2px ${getDifficulty(difficulty) || ''}`,
    filter: 'drop-shadow(0 0 1rem rgba(0, 0, 0, 0.23))',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around'
  },
  banner: {
    width: `calc(calc(211px + calc(4 * ${C.spacing(0)})) - 14px)`,
    cursor: 'pointer'
  },
  title: {
    margin: '0px',
    fontSize: '75px'
  },
  button: {
    background: 'white'
  }
}));

export default function PuzzleCard(props) {
  const { text, completed, link } = props;
  const history = useHistory();
  const classes = useClasses(props);
  return (
    <Holder
      className={classes.paper}
      justify='space-between'
      onClick={() => history.push(link)}>
      {!completed && (
        <Typography className={classes.title} variant='h4'>
          {text}
        </Typography>
      )}
      {completed ? (
        <img alt='success banner' src={banner} className={classes.banner} />
      ) : null}
      <Button
        type={types.primary}
        disabled={completed}
        className={classes.button}
        onClick={() => history.push(link)}>
        {completed ? 'solved' : 'solve'}
      </Button>
    </Holder>
  );
}
