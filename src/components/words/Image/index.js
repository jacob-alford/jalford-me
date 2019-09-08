import React , { useState } from 'react';
import { useSpring , animated as a , interpolate } from 'react-spring';

import useScrollTrigger from 'components/bindings/hooks/useScrollTrigger';

const styles = {
  image:{
    width:'100%',
    position:'absolute',
    boxShadow:'0px 0px 77px -32px rgba(0,0,0,0,75)'
  },
  imageHolder:{
    width:'50%',
    paddingBottom:'50%',
    position:'relative',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'35px',
    marginTop:'35px'
  },
  fallbackHolder:{
    lineHeight:0
  }
}

const types = {
  "jpg":'jpeg',
  "jpeg":'jpeg',
  "png":'png',
  "webp":'webp',
  "tif":'tiff',
  "tiff":"tiff",
  "svg":"svg+xml",
  "gif":"gif"
}

const resolveType = imgSrc => {
  const split = imgSrc.split(".");
  return `image/${types[split[split.length-1]] || ''}`
}

export default function Image(props){
  const {
    src, alt, naked,
    imageStyles, holderStyles,
    scrollFade = false, onClick,
    fallbackSrc
  } = props;
  const [hasLoaded,setHasLoaded] = useState(false);
  const handleLoaded = () => setHasLoaded(true);
  const [imageTriggered,imageRef] = useScrollTrigger({active:scrollFade});
  const { opacity } = useSpring({
    opacity:(hasLoaded && (imageTriggered || !scrollFade)) ? 1 : 0
  });
  if(naked) {
    if(fallbackSrc)
      return (
        <picture style={styles.fallbackHolder}>
          <a.source
            alt={alt}
            ref={imageRef}
            onLoad={handleLoaded}
            srcSet={src}
            onClick={onClick}
            type={resolveType(src)}
            style={{...imageStyles,opacity:interpolate([opacity],opacity => opacity)}} />
          <a.img
            alt={alt}
            ref={imageRef}
            onLoad={handleLoaded}
            src={fallbackSrc}
            onClick={onClick}
            style={{...imageStyles,opacity:interpolate([opacity],opacity => opacity)}} />
        </picture>
      );
    else
      return (
        <a.img
          alt={alt}
          ref={imageRef}
          onLoad={handleLoaded}
          src={src}
          onClick={onClick}
          style={{...imageStyles,opacity:interpolate([opacity],opacity => opacity)}} />
      );
  }else{
    if(fallbackSrc)
      return (
        <a.div style={{...styles.imageHolder,...holderStyles,opacity:interpolate([opacity],opacity => opacity)}}>
          <picture style={styles.fallbackHolder}>
            <source
              alt={alt}
              ref={imageRef}
              onLoad={handleLoaded}
              srcSet={src}
              onClick={onClick}
              type={resolveType(src)}
              style={{...styles.image,...imageStyles}} />
            <img
              alt={alt}
              ref={imageRef}
              onLoad={handleLoaded}
              src={fallbackSrc}
              onClick={onClick}
              style={{...styles.image,...imageStyles}} />
          </picture>
        </a.div>
      );
    else
      return (
        <a.div style={{...styles.imageHolder,...holderStyles,opacity:interpolate([opacity],opacity => opacity)}}>
          <img
            alt={alt}
            ref={imageRef}
            onLoad={handleLoaded}
            src={src}
            onClick={onClick}
            style={{...styles.image,...imageStyles}} />
        </a.div>
      );
  }
}
