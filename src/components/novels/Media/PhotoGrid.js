import React from 'react';

import Photo from './Photo.js';

import { themeHook } from 'theme';

const useClasses = themeHook({
  gridContainer:{
    display:'flex',
    flexDirection:'row',
    width:'100%'
  },
  justAList:{
    display:'flex',
    flexDirection:'column'
  }
});

const divzBy4 = num => num % 4 === 0;
const divzBy3 = num => num % 3 === 0;

const createArr = length => {
  const out = [];
  for(let i=0;i<length;i++)
    out.push(null);
  return out;
}

const createPhotoGridBy = num => ({photos}) => {
  const classes = useClasses();
  return createArr(photos.length / num).map((_,index) => (
    <div className={classes.gridContainer} key={`photoRow${index}`}>
      {photos.slice(index * num,index * num + num).map(({url,alt},index2) =>
        <Photo src={url} alt={alt} key={`${url}${index2}`}/>
      )}
    </div>
  ));
}

const GridBy4 = createPhotoGridBy(4);
const GridBy3 = createPhotoGridBy(3);
const GridBy2 = createPhotoGridBy(2);

const getGridSizer = {
  "2":GridBy2,
  "3":GridBy3,
  "4":GridBy4
}

export default function PhotoGrid(props){
  const { photos , cols } = props;
  if(cols && getGridSizer[cols]){
    const Dobj = getGridSizer[cols];
    return <Dobj photos={photos} />
  }
  if(divzBy4(photos.length))
    return <GridBy4 photos={photos} />;
  else if(divzBy3(photos.length))
    return <GridBy3 photos={photos} />;
  else
    return <GridBy2 photos={photos} />;
}
