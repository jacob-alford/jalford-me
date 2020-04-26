import { useState, useCallback, useEffect } from 'react';
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
      console.log(
        'Acting on global state, with: ',
        selector.toString(),
        'using state: ',
        store
      );
      updateStore(reducer(store, { selector, payload }));
    },
    [store, reducer]
  );
  useEffect(() => {
    console.log('updated store:', store);
  }, [store]);
  return [store, mutate];
};

export default useStoreReducer;
