import { useContext, useCallback } from 'react';
import { MutateState } from '../Provider/Provider';
import { finalActionSelector, actionPayload } from '../state-model/types';

const useAsyncAction = (selector: finalActionSelector) => {
  const actOnGlobalState = useContext(MutateState);
  return useCallback(
    async (asyncCallback: () => Promise<actionPayload>) => {
      const payload = await asyncCallback();
      actOnGlobalState(selector, payload || {});
    },
    [actOnGlobalState, selector]
  );
};

export default useAsyncAction;
