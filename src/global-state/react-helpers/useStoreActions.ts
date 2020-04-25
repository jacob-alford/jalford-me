import { useContext } from 'react';
import { MutateState } from '../global-state';
import { actionSelector } from '../state-model/types';

const useStoreActions = (selector: actionSelector) => {
  const actions = useContext(MutateState);
  return selector(actions);
};

export default useStoreActions;
