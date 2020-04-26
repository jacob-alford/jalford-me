import { stateActions, alertEnum } from './types';
import action from '../state-constructors/action';
import listenTo from '../state-constructors/listenTo';
import { defaultState } from '../global-state';
import { getRandomUID } from 'functions';

const userActions: stateActions = {
  login: action((state, { user }) => {
    if (!user) throw new Error('Payload.user is required to login!');
    state.user.details = user;
    state.user.loggedIn = true;
    state.user.hydrated = true;
  }),
  logout: action(state => {
    state.user.details = defaultState.user.details;
    state.user.loggedIn = false;
    state.user.hydrated = true;
  }),
  updateUser: action((state, { user }) => {
    if (!user) return;
    state.user.details = user;
    console.log('updating');
  }),
  notifyUpdate: listenTo(
    actions => actions.user.updateUser,
    (state, _, actions) => {
      if (!actions) return;
      console.log('notifying');
      actions.notifications.add(state, {
        notification: {
          timeout: 4500,
          body: 'Successfully updated user!',
          alertType: alertEnum.success,
          timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
          uid: getRandomUID()
        }
      });
    }
  )
};

export default userActions;
