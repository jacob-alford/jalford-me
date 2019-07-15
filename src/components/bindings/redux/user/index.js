import initialState from '../initialState.js';
import { LOG_IN , LOG_OUT } from './actions.js';


export default function user(state=initialState.user,action){
  switch (action.type){
    case LOG_IN:
      return {
        ...state,
        activeUser:{
          loggedIn:true,
          activeUser:{
            username:action.payload.username,
            permissions:action.payload.permissions
          }
        }
      }
    case LOG_OUT:
      return {
        ...state,
        activeUser:{
          loggedIn:false,
          activeUser:{
            username:null,
            permissions:0
          }
        }
      }
    default:
      return state;
  }
}
