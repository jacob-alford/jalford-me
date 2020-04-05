import React, { useReducer } from 'react';

import useSelect from './hooks/useSelect';
import useDispatch from './hooks/useDispatch';

import userActions, { defaultUserState } from './user';
import notificationActions, { defaultNotifState } from './notifications';
import tldActions, { defaultTLDState } from './lightDarkToggles';

const GlobalState = React.createContext();
const MutateGlobalState = React.createContext();

const actions = {
  user: {
    ...userActions
  },
  notifications: {
    ...notificationActions
  },
  themeMode: {
    ...tldActions
  }
};

const defaultState = {
  ...defaultUserState,
  ...defaultNotifState,
  ...defaultTLDState
};

const reducer = (state, action) => {
  const { domain, selector, payload } = action;
  try {
    return {
      ...state,
      [domain]: actions[domain][selector](state, payload)
    };
  } catch (err) {
    throw new Error(
      `Either domain (${domain})
           or selector (${selector}) not recognized!
      err: ${err}`
    );
  }
};

function GlobalStateProvider(props) {
  const [globalState, actOnState] = useReducer(reducer, defaultState);
  return (
    <GlobalState.Provider value={globalState}>
      <MutateGlobalState.Provider value={actOnState}>
        {props.children}
      </MutateGlobalState.Provider>
    </GlobalState.Provider>
  );
}

export { GlobalState, MutateGlobalState, useSelect, useDispatch };
export default GlobalStateProvider;
