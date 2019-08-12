import React from 'react';
import { Motion , spring } from 'react-motion';

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function withPageFade(Component){
  return props => {
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    if(prefersReducedMotion) return (
      <Component {...props} />
    );
    else{
      const defaultStyle = {
        filter:1.25,
        transform:.9,
        opacity:0
      }
      const inStyle = {
        filter:spring(0, {stiffness:60,damping:15}),
        transform:spring(1, {stiffness:60,damping:15}),
        opacity:spring(1, {stiffness:60,damping:15})
      }
      return (
        <Motion defaultStyle={defaultStyle} style={inStyle}>
          {interpolatedStyle => {
            const { filter:blur , transform:scale , opacity } = interpolatedStyle;
            const newStyle = {
              filter:`blur(${blur}em)`,
              transform:`scale(${scale})`,
              opacity:opacity
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
}
