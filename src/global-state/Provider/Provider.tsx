import React, { createContext } from 'react';
import { defaultState } from '../global-state';
import {
  finalActionSelector as actionSelector,
  actionPayload
} from '../state-model/types';
import useStoreReducer from '../react-helpers/useStoreReducer';
import stateReducer from '../global-state';

export const GlobalState = createContext(defaultState);
export const MutateState = createContext(
  (selector: actionSelector, payload: actionPayload) => {}
);

const GlobalStateProvider = (props: { children: any }) => {
  const [globalState, actOnGlobalState] = useStoreReducer(stateReducer, defaultState);
  return (
    <GlobalState.Provider value={globalState}>
      <MutateState.Provider value={actOnGlobalState}>
        {props.children}
      </MutateState.Provider>
    </GlobalState.Provider>
  );
};

export default GlobalStateProvider;
