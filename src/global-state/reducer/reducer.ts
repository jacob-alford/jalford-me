import { Reducer } from 'redux';
import { globalStore, actionPayload, storeActions } from '../state-model/_types';
import { defaultState } from '../global-state';

export type storeReducer = Reducer<globalStore, actionPayload>;

const makeReducer = (actions: storeActions): storeReducer => (
  store = defaultState,
  action: actionPayload
) => {
  if (!Array.isArray(action.type)) return store;
  const {
    type: [domain, type]
  } = action;
  if (!actions[domain][type]) throw new Error(`Unknown store action, ${type}`);
  // @ts-ignore
  return actions[domain][type](store, action);
};

export default makeReducer;
