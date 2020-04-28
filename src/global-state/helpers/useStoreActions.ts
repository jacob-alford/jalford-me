import { useCallback, useContext } from 'react';
import { GlobalActions } from '../Provider/Provider';
import { actionPayload, actionSelector } from '../state-model/_types';

const useStoreActions = (selector: actionSelector) => {
  const storeActions = useContext(GlobalActions);
  return useCallback(
    (payload?: actionPayload) =>
      storeActions({
        data: payload || {},
        selector
      }),
    [selector, storeActions]
  );
};

export default useStoreActions;
