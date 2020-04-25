import { useContext } from 'react';
import { MutateState } from '../global-state';
import { actionSelector, actionPayload } from '../state-model/types';

const useStoreActions = (selector: actionSelector) => {
  const actOnGlobalState = useContext(MutateState);
  return (payload: actionPayload) => actOnGlobalState(selector, payload);
};

export default useStoreActions;
