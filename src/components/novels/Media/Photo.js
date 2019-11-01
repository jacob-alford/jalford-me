import React from 'react';

import Image from 'components/words/Image';

import { themeHook } from 'theme';

const useClasses = themeHook({
  photo:{
    flex:1
  },
  photoInternal:{
    width:'100%',
    height:'100%',
    objectFit:'cover',
    objectPosition:'center center'
  }
});

export default function Photo(props){
  const { src , alt } = props;
  const classes = useClasses();
  return (
    <div className={classes.photo}>
      <Image naked src={src} alt={alt} className={classes.photoInternal}/>
    </div>
  );
}
