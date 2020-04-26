import {
  actionTypes,
  stateActions,
  finalStoreActions,
  finalStoreAction,
  storeActions as storeActionsType
} from '../state-model/types';
import { aggregate } from 'functions';

const deriveActions = (allActions: storeActionsType) =>
  Object.entries(allActions).reduce<finalStoreActions>(
    (calcActions, entries: [string, stateActions]) => {
      const [groupKey, groupActions] = entries;
      const actions = Object.entries(groupActions).filter(
        ([, action]) => action.type === actionTypes.action
      );
      const listenTos = Object.entries(groupActions).filter(
        ([, action]) => action.type === actionTypes.listenTo
      );
      calcActions[groupKey] = actions.reduce(
        (finalActions: finalStoreAction, [key, { operator }]) => {
          finalActions[key] = aggregate(
            operator,
            ...listenTos
              .filter(([, { selector }]) => {
                if (!selector) throw new Error(`listenTo.selector must be defined!`);
                if (!selector(allActions))
                  throw new Error(`Unrecognized action selector! ${selector.toString()}`);
                return allActions[groupKey][key] === selector(allActions);
              })
              .map(([, { operator }]) => operator)
          );
          return finalActions;
        },
        {}
      );
      return calcActions;
    },
    {}
  );

export default deriveActions;
