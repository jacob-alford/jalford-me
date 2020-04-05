import React from 'react';
import { useSpring, animated as a } from 'react-spring';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollToTopOnload from 'components/bindings/hooks/useScrollToTopOnload';

export default function withPageFade(Component) {
  return props => {
    useScrollToTopOnload();
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const { opacity, transform } = useSpring({
      opacity: 1,
      transform: `translate3d(0,0px,0)`,
      from: {
        opacity: 0,
        transform: `translate3d(0,35px,0)`
      }
    });
    if (prefersReducedMotion) return <Component {...props} />;
    else
      return (
        <a.div
          style={{
            opacity: opacity,
            transform: transform
          }}>
          <Component {...props} />
        </a.div>
      );
  };
}
