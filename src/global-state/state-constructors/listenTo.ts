import {
  actionTypes,
  actionSelector as actionSelectorType,
  stateModel,
  actionPayload
} from '../state-model/types';

const listenTo = (
  selector: actionSelectorType,
  operator: (store: stateModel, payload: actionPayload) => void
) => ({
  type: actionTypes.listenTo,
  operator,
  selector
});

export default listenTo;
