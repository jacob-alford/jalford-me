import { useContext, useMemo } from 'react';
import { GlobalState } from '../global-state';
import { stateModel } from '../state-model/types';

const useStoreState = (selector: (state: stateModel) => any) => {
  const state = useContext(GlobalState);
  return useMemo(() => selector(state), [selector, state]);
};

export default useStoreState;
