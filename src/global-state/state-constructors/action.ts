import produce from 'immer';
import {
  stateModel,
  actionPayload,
  stateAction as stateActionType,
  actionTypes
} from '../state-model/types';

const action = (
  stateAction: (store: stateModel, payload: actionPayload) => void
): stateActionType => ({
  operator: produce((draft: stateModel, payload: actionPayload) =>
    stateAction(draft, payload)
  ),
  type: actionTypes.action
});

export default action;
