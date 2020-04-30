import produce from 'immer';
import { trigger, actionConstructor, storeActions } from '../state-model/_types';

const simpleTrigger = (action: actionConstructor): trigger => (actions: storeActions) =>
  produce(action);

export default simpleTrigger;
