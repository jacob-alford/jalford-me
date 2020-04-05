import React from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { themeHook } from 'theme';

const useClasses = themeHook({
  operatorHolder: {
    borderRadius: '8px',
    margin: minorSpacing,
    background: ({ bg }) => bg,
    border: ({ bc }) => `solid ${bc} 4px`
  },
  btnOperator: {
    fontSize: '2rem'
  },
  divider: {
    width: '75%',
    height: '2px',
    background: 'white'
  }
});

export default function DigitRocker(props) {
  const { increment, decrement } = props;
  const screenTooSmall = useMediaQuery('(max-width: 500px)');
  const classes = useClasses(props);
  return (
    <Holder
      className={classes.operatorHolder}
      style={{ margin: screenTooSmall ? '0px' : null }}>
      <Button
        style={{ color: 'rgba(255,255,255,1)' }}
        className={classes.btnOperator}
        onClick={increment}>
        +
      </Button>
      <div className={classes.divider} />
      <Button
        style={{ color: 'rgba(255,255,255,1)' }}
        className={classes.btnOperator}
        onClick={decrement}>
        -
      </Button>
    </Holder>
  );
}
