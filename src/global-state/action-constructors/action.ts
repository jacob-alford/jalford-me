import produce from 'immer';
import { action as actionType, actionConstructor } from '../state-model/_types';

const action = (action: actionConstructor): actionType => produce(action);

export default action;
