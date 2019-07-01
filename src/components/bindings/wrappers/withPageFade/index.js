import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { StyledPage } from './style.js';

import useMountCheck from '../../hooks/useMountCheck';

export default function withPageFade(Component){
  return props => {
    const isMounted = useMountCheck();
    return (
      <StyledPage>
        <CSSTransition in={isMounted} classNames="page" timeout={500}>
          <Component {...props} />
        </CSSTransition>
      </StyledPage>
    );
  }
}
