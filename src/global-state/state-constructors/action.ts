import produce from 'immer';
import { stateModel, actionPayload } from '../state-model/types';

const action = (stateAction: (store: stateModel, payload: actionPayload) => void) =>
  produce((draft: stateModel, payload: actionPayload) => stateAction(draft, payload));

export default action;
