import { useContext, useCallback } from 'react';
import { MutateState } from '../Provider/Provider';
import { finalActionSelector, actionPayload } from '../state-model/types';

const useStoreActions = (selector: finalActionSelector) => {
  const actOnGlobalState = useContext(MutateState);
  return useCallback(
    (payload?: actionPayload) => actOnGlobalState(selector, payload || {}),
    [actOnGlobalState, selector]
  );
};

export default useStoreActions;
