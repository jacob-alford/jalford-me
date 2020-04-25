import produce from 'immer';
import {
  stateAction,
  stateModel,
  userPayload,
  themePayload,
  notificationPayload
} from '../state-model/types';

const action = (stateAction: stateAction) =>
  produce(
    (draft: stateModel, payload: userPayload | themePayload | notificationPayload) =>
      stateAction(draft, payload)
  );

export default action;
