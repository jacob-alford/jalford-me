import React , { useState } from 'react';
import { Motion , spring } from 'react-motion';

const styles = {
  image:{
    width:'100%',
    position:'absolute',
    boxShadow:'0px 0px 77px -32px rgba(0,0,0,0,75)'
  },
  imageHolder:{
    width:'50%',
    height:'0',
    paddingBottom:'50%',
    position:'relative',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'35px',
    marginTop:'35px'
  }
}

export default function Image(props){
  const {
    src, alt, naked,
    imageStyles, holderStyles,
    unloadedStyle = {opacity:0},
    loadedStyle = {opacity:spring(1)}
  } = props;

  const [hasLoaded,setHasLoaded] = useState(false);
  const handleLoaded = () => setHasLoaded(true);
  if(naked) return (
    <Motion
      defaultStyle={{opacity:0}}
      style={(hasLoaded) ? loadedStyle : unloadedStyle}>
      {newStyle => (
        <img
          alt={alt}
          onLoad={handleLoaded}
          src={src}
          style={{...newStyle,...imageStyles}} />
      )}
    </Motion>
  );
  else return (
    <div style={{...styles.imageHolder,...holderStyles}}>
      <Motion
        defaultStyle={{opacity:0}}
        style={(hasLoaded) ? loadedStyle : unloadedStyle}>
        {newStyle => (
          <img
            alt={alt}
            onLoad={handleLoaded}
            src={src}
            style={{...styles.image,...newStyle,...imageStyles}} />
        )}
      </Motion>
    </div>
  );
}
