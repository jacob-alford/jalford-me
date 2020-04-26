import { stateModel, reducerAction, finalStoreActions } from '../state-model/types';

export const makeReducer = (actions: finalStoreActions) => (
  state: stateModel,
  action: reducerAction
): stateModel => {
  const { selector, payload = {} } = action;
  if (!selector(actions))
    throw new Error(`Unknown store selector: ${selector.toString()}`);
  const returnVal = selector(actions)(state, payload, actions);
  if (!returnVal)
    throw new Error(
      `Actions must have a return state!  Recieved value: ${returnVal}, with selector: ${selector.toString()}`
    );
  return returnVal;
};

export default makeReducer;
