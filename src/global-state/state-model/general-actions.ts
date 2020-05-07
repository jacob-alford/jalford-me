import { storeActionCategory, emptyPayload as EP } from './_types';
import { generalActors } from './_actors';
import doNothing from '../action-constructors/doNothing';

const generalActions: storeActionCategory<EP<generalActors>> = {
  [generalActors.initialLoad]: doNothing()
};

export default generalActions;
