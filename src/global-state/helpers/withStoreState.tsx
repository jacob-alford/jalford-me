import React, { ReactPropTypes, FunctionComponent, useMemo } from 'react';
import useStoreState from './useStoreState';
import { globalStoreSelector } from '../state-model/_types';
interface ParentProps {
  selector: globalStoreSelector;
  otherProps: ReactPropTypes;
  children: (storeValue: any, otherProps: ReactPropTypes) => JSX.Element;
}

const Parent = (props: ParentProps) => {
  const { selector, children, otherProps } = props;
  const storeValue = useStoreState(selector);
  return useMemo(() => children(storeValue, otherProps), [
    storeValue,
    children,
    otherProps
  ]);
};

type stateMapper = (
  value: any
) => {
  [key: string]: any;
};

const withStoreState = (
  selector: globalStoreSelector,
  mapStateToProps: stateMapper = storeValue => ({ storeValue })
) => (WrappedComponent: FunctionComponent<any>) => (props: ReactPropTypes) => (
  <Parent selector={selector} otherProps={props}>
    {(storeValue, otherProps) => (
      <WrappedComponent {...otherProps} {...mapStateToProps(storeValue)} />
    )}
  </Parent>
);

export default withStoreState;
