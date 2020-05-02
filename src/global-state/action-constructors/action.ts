import produce from 'immer';
import { action as actionType, actionConstructor } from '../state-model/_types';

function action<payloadType>(
  action: actionConstructor<payloadType>
): actionType<payloadType> {
  return produce(action);
}

export default action;
