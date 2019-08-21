import React from 'react';
import { Motion , spring } from 'react-motion';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const defaultStyle = {
  opacity:0,
  y:35
}
const inStyle = {
  opacity:spring(1, {stiffness:60,damping:15}),
  y:spring(0, {stiffness:60,damping:15})
}

export default function withPageFade(Component){
  return props => {
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    if(prefersReducedMotion) return (
      <Component {...props} />
    );
    else return (
      <Motion defaultStyle={defaultStyle} style={inStyle}>
        {interpolatedStyle => {
          const { opacity , y } = interpolatedStyle;
          const newStyle = {
            opacity:opacity,
            transform:`translate3d(0,${y}px,0)`
          }
          return (
            <div style={newStyle}>
              <Component {...props} />
            </div>
          );
        }}
      </Motion>
    );
  }
}
