import { Reducer } from 'redux';
import { globalStore, actionPayload, storeActions } from '../state-model/_types';
import { defaultState } from '../global-state';

export type storeReducer = Reducer<globalStore, actionPayload>;

const makeReducer = (actions: storeActions): storeReducer => (
  store = defaultState,
  data
) => {
  const {
    type: [domain, type],
    payload
  } = data;
  if (!actions[domain][type]) throw new Error(`Unknown store action, ${type}`);
  return actions[domain][type](store, payload);
};

export default makeReducer;
