import { stateModel, reducerAction } from '../state-model/types';
import deriveActions from './deriveActions';
import { storeActions } from '../global-state';

const calculatedActions = deriveActions(storeActions);

export const stateReducer = (state: stateModel, action: reducerAction): stateModel => {
  const { selector, payload = {} } = action;
  if (!selector(calculatedActions))
    throw new Error(`Unknown store selector: ${selector.toString()}`);
  const returnVal = selector(calculatedActions)(state, payload);
  if (!returnVal)
    throw new Error(`Actions must have a return state!  Recieved value: ${returnVal}`);
  return returnVal;
};

export default stateReducer;
