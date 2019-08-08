import user from './user';

export default function reduxStore(state = {}, action){
  return{
    user:user(state.user,action)
  }
}

export { setLoggedIn , setLoggedOut , setLoggedOutWithWater } from './user/actions.js';
