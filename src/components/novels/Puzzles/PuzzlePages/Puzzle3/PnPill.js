import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Holder from 'components/words/Holder';

import { themeHook } from 'theme';

const useClasses = themeHook(
  (['getCardPadding','getMinorSpacing']),
  ([cardPadding,minorSpacing]) => ({
    cell:{
      width:'32.5vw',
      minHeight:'76px',
      color:({solved}) =>
        (solved === true) ?
          '#357e37'
        : (solved === false) ?
            '#d32f2f'
          : 'rgba(0,0,0,.89)',
      padding:cardPadding,
      marginTop:({mTop}) => (mTop) ? minorSpacing : 0,
      marginBottom:({mBot}) => (mBot) ? minorSpacing : 0,
      boxShadow: ({clearShadow}) => (!clearShadow) ? '10px 10px 64px -17px rgba(0,0,0,0.75)' : null
    },
    rCell:{
      borderRadius:
        ({order = true}) =>
          (order) ?
            '0px 8px 8px 0px'
          : '8px 0px 0px 8px'
    },
    lCell:{
      borderRadius:
        ({order = true}) =>
          (order) ?
            '8px 0px 0px 8px'
          : '0px 8px 8px 0px'
    },
    pCell:{
      backgroundColor:({clearShadow}) => (!clearShadow) ? '#ffffff' : 'black',
      color:({clearShadow}) => (!clearShadow) ? null : 'white'
    },
    nCell:{
      backgroundColor:({clearShadow}) => (!clearShadow) ? '#ffffff' : 'black',
      color:({clearShadow}) => (!clearShadow) ? null : 'white'
    },
    analogy:{

    },
    type:{
      fontWeight:'bold'
    }
  })
);

const cat = (...str) => str.join(" ");
const getZString = test => ({zIndex:(test) ? 2 : 1});

export default function PnPill(props){
  const {
    pChildren, nChildren, clearShadow,
    checkFunc
  } = props;
  const classes = useClasses(props);
  return (
    <Holder className={classes.analogy} direction="col">
      <Holder direction="row">
        <Holder
          justify={(typeof pChildren === 'string') ? (clearShadow) ? 'flex-end' : 'space-between' : 'flex-end'}
          direction="row"
          className={cat(classes.pCell,classes.cell,classes.lCell)}
          style={getZString(typeof pChildren === 'string')}>
          {(typeof pChildren === 'string') ? (
            <React.Fragment>
              {(!clearShadow) ?
                <Button
                  variant="outlined"
                  className={classes.checkButton}
                  size="small"
                  onClick={checkFunc}>
                  Check
                </Button>
              : null}
              <Typography className={classes.type}>
                {pChildren}
              </Typography>
            </React.Fragment>
          ) : pChildren}
        </Holder>
        <Holder
          justify='space-between'
          direction="row"
          className={cat(classes.nCell,classes.cell,classes.rCell)}
          style={getZString(typeof nChildren === 'string')}>
          {(typeof nChildren === 'string') ? (
            <React.Fragment>
              <Typography className={classes.type}>
                {nChildren}
              </Typography>
              {(!clearShadow) ?
                <Button
                  variant="outlined"
                  className={classes.checkButton}
                  size="small"
                  onClick={checkFunc}>
                  Check
                </Button>
              : null}
            </React.Fragment>
          ) : nChildren}
        </Holder>
      </Holder>
    </Holder>
    );
}
