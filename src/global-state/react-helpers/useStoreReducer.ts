import { useState, useCallback } from 'react';
import {
  stateModel,
  reducerAction,
  actionPayload,
  finalActionSelector
} from '../state-model/types';

const useStoreReducer = (
  reducer: (state: stateModel, action: reducerAction) => stateModel,
  defaultState: stateModel
): [stateModel, (selector: finalActionSelector, payload: actionPayload) => void] => {
  const [store, updateStore] = useState<stateModel>(defaultState);
  const mutate = useCallback(
    (selector: finalActionSelector, payload: actionPayload) => {
      updateStore(reducer(store, { selector, payload }));
    },
    [store, reducer]
  );
  return [store, mutate];
};

export default useStoreReducer;
