import user from './user';

export default function reduxStore(state = {}, action){
  return{
    user:user(state.user,action)
  }
}

export { setLoggedIn , setLoggedOut } from './user/actions.js';
