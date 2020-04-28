import React, { ReactPropTypes, FunctionComponent, useMemo } from 'react';
import useStoreState from './useStoreState';
import { globalStoreSelector } from '../state-model/_types';
interface ParentProps {
  selector: globalStoreSelector;
  children: (storeValue: any) => JSX.Element;
}

const Parent = (props: ParentProps) => {
  const { selector, children } = props;
  const storeValue = useStoreState(selector);
  return useMemo(() => children(storeValue), [storeValue, children]);
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
  <Parent selector={selector}>
    {storeValue => <WrappedComponent {...props} {...mapStateToProps(storeValue)} />}
  </Parent>
);

export default withStoreState;
