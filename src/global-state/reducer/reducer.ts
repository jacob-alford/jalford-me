import {
  triggerSelector,
  globalStore,
  actionPayload,
  storeActions
} from '../state-model/_types';

export type storeReducer = (
  store: globalStore,
  payload: { type: triggerSelector; data: actionPayload }
) => globalStore;

const makeReducer = (actions: storeActions): storeReducer => (store, payload) => {
  const { type: selector, data } = payload;
  if (!selector(actions)) throw new Error(`Unknown store action, ${selector.toString()}`);
  return selector(actions)(actions)(store, data);
};

export default makeReducer;
