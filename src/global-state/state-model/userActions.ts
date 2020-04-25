import { stateActions } from './types';
import action from '../state-constructors/action';
import { defaultState } from '../global-state';

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
  })
};

export default userActions;
