import React from 'react';

import { themeHook } from 'theme';

const useClasses = themeHook(
  (['getMajorSpacing']),
  ([majorSpacing]) => ({
    divider:{
      marginTop:({margins}) => (margins) ? majorSpacing : null,
      marginBottom:({margins}) => (margins) ? majorSpacing : null,
      width:'75%',
      height:'2px',
      background:({color}) => color || 'white'
    }
  })
);

export default function Divider(props){
  const classes = useClasses(props);
  return <div className={classes.divider} />
}
