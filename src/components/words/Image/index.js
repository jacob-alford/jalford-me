import React , { useState } from 'react';
import { useSpring , animated as a , interpolate } from 'react-spring';

import useScrollTrigger from '../../bindings/hooks/useScrollTrigger';

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
    scrollFade = false
  } = props;
  const [hasLoaded,setHasLoaded] = useState(false);
  const handleLoaded = () => setHasLoaded(true);
  const [imageTriggered,imageRef] = useScrollTrigger({active:scrollFade});
  const { opacity } = useSpring({
    opacity:(hasLoaded && (imageTriggered || !scrollFade)) ? 1 : 0
  });
  if(naked) return (
    <a.img
      alt={alt}
      ref={imageRef}
      onLoad={handleLoaded}
      src={src}
      style={{...imageStyles,opacity:interpolate([opacity],opacity => opacity)}} />
  );
  else return (
    <a.div style={{...styles.imageHolder,...holderStyles,opacity:interpolate([opacity],opacity => opacity)}}>
      <img
        alt={alt}
        ref={imageRef}
        onLoad={handleLoaded}
        src={src}
        style={{...styles.image,...imageStyles}} />
    </a.div>
  );
}
