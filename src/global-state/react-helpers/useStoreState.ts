import { useContext } from 'react';
import { GlobalState } from '../global-state';
import { stateModel } from '../state-model/types';

const useStoreState = (selector: (state: stateModel) => any) => {
  const state = useContext(GlobalState);
  return selector(state);
};

export default useStoreState;
