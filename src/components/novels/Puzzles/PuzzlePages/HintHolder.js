import React from 'react';

import Holder from 'components/words/Holder';

import Hintput from './Hintput.js';

import { themeHook } from 'theme';

const useClasses = themeHook(
  (['getMajorSpacing']),
  ([majorSpacing]) => ({
    fieldHolder:{
      background:'white',
      padding:majorSpacing,
      borderRadius:'8px',
      maxWidth:'75vw',
      marginBottom:majorSpacing
    }
  })
);

export default function HintHolder(props){
  const { hints } = props;
  const classes = useClasses();
  return (
    <Holder className={classes.fieldHolder} direction="row">
      {hints.map((hint,index) => {
        const {
          label, hash, boxLabel,
          setCorrect, correct
        } = hint;
        return (
          <Hintput
            key={`hintputBox#${index}`}
            label={label}
            hash={hash}
            boxLabel={boxLabel}
            setCorrect={setCorrect}
            correct={correct} />
        );
      })}
    </Holder>
  );
}
