import produce from 'immer';
import {
  trigger as triggerType,
  globalStore,
  actionPayload,
  storeActions
} from '../state-model/_types';

const trigger = (triggerConstructor: triggerType): triggerType => (
  actions: storeActions
) => {
  const triggerActions = triggerConstructor(actions);
  return produce((draftStore: globalStore, payload: actionPayload = {}) =>
    triggerActions(draftStore, payload)
  );
};

export default trigger;
