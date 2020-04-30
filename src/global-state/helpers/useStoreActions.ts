import { useCallback, useContext } from 'react';
import { GlobalActions } from '../Provider/Provider';
import { actionPayload, triggerSelector } from '../state-model/_types';

const useStoreActions = (selector: triggerSelector) => {
  const storeActions = useContext(GlobalActions);
  return useCallback((payload: actionPayload = {}) => storeActions(selector, payload), [
    selector,
    storeActions
  ]);
};

export default useStoreActions;
