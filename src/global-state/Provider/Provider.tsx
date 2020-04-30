import React, { createContext, useCallback, useReducer } from 'react';
import makeReducer from '../reducer/reducer';
import { defaultState, storeActions } from '../global-state';
import { actionPayload, triggerSelector } from '../state-model/_types';

const storeReducer = makeReducer(storeActions);

export const GlobalStore = createContext(defaultState);
export const GlobalActions = createContext<
  (selector: triggerSelector, data: actionPayload) => void
>(() => {});

const Provider = (props: any) => {
  const [globalStore, _mutateStore] = useReducer(storeReducer, defaultState);
  const actOnGlobalStore = useCallback(
    async (selector: triggerSelector, data: actionPayload) => {
      _mutateStore({
        type: selector,
        data
      });
    },
    []
  );
  return (
    <GlobalStore.Provider value={globalStore}>
      <GlobalActions.Provider value={actOnGlobalStore}>
        {props.children}
      </GlobalActions.Provider>
    </GlobalStore.Provider>
  );
};

export default Provider;
