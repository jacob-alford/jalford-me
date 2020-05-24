import { memo } from 'react';
import isEqual from 'lodash/isEqual';

const renderOnPropDiff = (Component: (props: any) => JSX.Element) =>
  memo(Component, (p1, p2) => isEqual(p1, p2));

export default renderOnPropDiff;
