import {
  actionTypes,
  actionSelector as actionSelectorType,
  stateModel,
  actionPayload,
  finalStoreActions
} from '../state-model/types';

const listenTo = (
  selector: actionSelectorType,
  operator: (
    store: stateModel,
    payload: actionPayload,
    actions?: finalStoreActions
  ) => void
) => ({
  type: actionTypes.listenTo,
  operator,
  selector
});

export default listenTo;
