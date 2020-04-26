import {
  stateModel,
  themeState,
  storeActions as storeActionsType
} from './state-model/types';
import user from './state-model/userActions';
import notifications from './state-model/notificationActions';
import theme from './state-model/themeActions';
import makeReducer from './reducer/reducer';
import deriveActions from './reducer/deriveActions';

export const defaultState: stateModel = {
  user: {
    hydrated: false,
    loggedIn: false,
    details: {
      uid: '',
      color: '',
      image: '',
      permissions: { value: 0 },
      username: '',
      puzzles: []
    }
  },
  notifications: [],
  theme: themeState.light
};

export const storeActions: storeActionsType = {
  user,
  notifications,
  theme
};

const globalStateReducer = makeReducer(deriveActions(storeActions));

export default globalStateReducer;
