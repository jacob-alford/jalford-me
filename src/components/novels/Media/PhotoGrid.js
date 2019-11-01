import React from 'react';

import Photo from './Photo.js';

import Holder from 'components/words/Holder';

import { themeHook } from 'theme';

const useClasses = themeHook({
  gridContainer:{
    display:'flex',
    flexDirection:'row'
  },
  justAList:{
    display:'flex',
    flexDirection:'column'
  }
});

const divzBy4 = num => num % 4 === 0;
const divzBy3 = num => num % 3 === 0;
const even = num => num % 2 === 0;

const createPhotoGridBy = num => ({photos}) => {
  const classes = useClasses();
  return new Array(photos.length / num).map((_,index) => (
    <div className={classes.gridContainer}>
      {photos.slice(index * num,index * num + num).map(({url,alt}) =>
        <Photo src={url} alt={alt} />
      )}
    </div>
  ));
}

const GridBy4 = createPhotoGridBy(4);
const GridBy3 = createPhotoGridBy(3);
const GridBy2 = createPhotoGridBy(2);

export default function PhotoGrid(props){
  const { photos } = props;
  const classes = useClasses();
  if(divzBy4(photos.length))
    return <GridBy4 photos={photos} />;
  else if(divzBy3(photos.length))
    return <GridBy3 photos={photos} />;
  else if(even(photos.length))
    return <GridBy2 photos={photos} />;
  else
    return (
      <div className={classes.justAList}>
        {photos.map(({url,alt}) => (
          <Photo src={url} alt={alt} />
        ))}
      </div>
    );
}
