import { useState, useCallback } from 'react';
import {
  stateModel,
  reducerAction,
  actionPayload,
  actionSelector
} from '../state-model/types';

const useStoreReducer = (
  reducer: (state: stateModel, action: reducerAction) => stateModel,
  defaultState: stateModel
): [stateModel, (selector: actionSelector, payload: actionPayload) => void] => {
  const [store, updateStore] = useState<stateModel>(defaultState);
  const mutate = useCallback(
    (selector: actionSelector, payload: actionPayload) => {
      updateStore(reducer(store, { selector, payload }));
    },
    [store, reducer, updateStore]
  );
  return [store, mutate];
};

export default useStoreReducer;
