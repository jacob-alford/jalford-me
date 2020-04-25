import React, { createContext } from 'react';
import {
  stateModel,
  themeState,
  storeActions,
  reducerAction,
  actionSelector,
  actionPayload
} from './state-model/types';
import user from './state-model/userActions';
import notifications from './state-model/notificationActions';
import theme from './state-model/themeActions';
import useStoreReducer from './react-helpers/useStoreReducer';

export const defaultState: stateModel = {
  user: {
    hydrated: false,
    loggedIn: false,
    details: {
      uid: '',
      color: '',
      image: '',
      permissions: 0,
      username: '',
      puzzles: []
    }
  },
  notifications: [],
  theme: themeState.light
};

const storeActions: storeActions = {
  user,
  notifications,
  theme
};

const stateReducer = (state: stateModel, action: reducerAction): stateModel => {
  const { selector, payload } = action;
  if (!selector(storeActions))
    throw new Error(`Unknown store selector: ${selector.toString()}`);
  return selector(storeActions)(state, payload);
};

export const GlobalState = createContext(defaultState);
export const MutateState = createContext(
  (selector: actionSelector, payload: actionPayload) => {}
);

const GlobalStateProvider = (props: { children: React.ReactChildren }) => {
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
