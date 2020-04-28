import React, { createContext, useState, useCallback } from 'react';
import { defaultState, storeActions } from '../global-state';
import { actionPayload, actionSelector } from '../state-model/_types';

export const GlobalStore = createContext(defaultState);
export const GlobalActions = createContext<
  (payload: { data: actionPayload; selector: actionSelector }) => void
>(() => {});

const Provider = (props: any) => {
  const [globalStore, _setGlobalStore] = useState(defaultState);
  const actOnGlobalStore = useCallback(
    async (payload: { data: actionPayload; selector: actionSelector }) => {
      const { selector, data } = payload;
      _setGlobalStore(await selector(storeActions)(globalStore, storeActions, data));
    },
    [globalStore]
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
