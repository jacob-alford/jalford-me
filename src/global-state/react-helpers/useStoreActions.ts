import { useContext, useCallback } from 'react';
import { MutateState } from '../global-state';
import { actionSelector, actionPayload } from '../state-model/types';

const useStoreActions = (selector: actionSelector) => {
  const actOnGlobalState = useContext(MutateState);
  return useCallback(
    (payload?: actionPayload) => actOnGlobalState(selector, payload || {}),
    [actOnGlobalState, selector]
  );
};

export default useStoreActions;
