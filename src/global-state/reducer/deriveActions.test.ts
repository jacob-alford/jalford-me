import { actionTypes, stateModel } from '../state-model/types';
import { defaultState } from '../global-state';
import deriveActions from './deriveActions';

const mockState: stateModel = defaultState;

describe('deriveActions functions properly', () => {
  it('collapses listenTo declarations into action invocations', () => {
    const action = jest.fn();
    const listenTo1 = jest.fn();
    const listenTo2 = jest.fn();
    const derivedActions = deriveActions({
      user: {
        listenTo1: {
          type: actionTypes.listenTo,
          operator: listenTo1,
          selector: actions => actions.user.action1
        },
        action1: {
          type: actionTypes.action,
          operator: action
        },
        listenTo2: {
          type: actionTypes.listenTo,
          operator: listenTo2,
          selector: actions => actions.user.action1
        }
      },
      notifications: {},
      theme: {}
    });
    derivedActions.user.action1(mockState, {});
    expect(action).toHaveBeenCalledTimes(1);
    expect(listenTo1).toHaveBeenCalledTimes(1);
    expect(listenTo2).toHaveBeenCalledTimes(1);
  });
  it('throws when selector is not defined', () => {
    const action = jest.fn();
    const listenTo1 = jest.fn();
    const listenTo2 = jest.fn();
    expect(() =>
      deriveActions({
        user: {
          listenTo1: {
            type: actionTypes.listenTo,
            operator: listenTo1
          },
          action1: {
            type: actionTypes.action,
            operator: action
          },
          listenTo2: {
            type: actionTypes.listenTo,
            operator: listenTo2
          }
        },
        notifications: {},
        theme: {}
      })
    ).toThrow('listenTo.selector must be defined!');
  });
  it('throws when unknown action is selected in listenTo', () => {
    const action = jest.fn();
    const listenTo1 = jest.fn();
    const listenTo2 = jest.fn();
    expect(() =>
      deriveActions({
        user: {
          listenTo1: {
            type: actionTypes.listenTo,
            operator: listenTo1,
            selector: actions => actions.user.butts
          },
          action1: {
            type: actionTypes.action,
            operator: action
          },
          listenTo2: {
            type: actionTypes.listenTo,
            operator: listenTo2,
            selector: actions => actions.user.alsoButts
          }
        },
        notifications: {},
        theme: {}
      })
    ).toThrow('Unrecognized action selector! actions => actions.user.butts');
  });
});
