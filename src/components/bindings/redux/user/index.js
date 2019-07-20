import initialState from '../initialState.js';
import { LOG_IN , LOG_OUT } from './actions.js';


export default function user(state=initialState.user,action){
  switch (action.type){
    case LOG_IN:
      return {
        loggedIn:true,
        activeUser:{
          uid:action.payload.uid,
          color:action.payload.color,
          icon:action.payload.icon,
          image:action.payload.image,
          likes:action.payload.likes,
          permissions:action.payload.permissions,
          username:action.payload.username
        }
      }
    case LOG_OUT:
      return {
        loggedIn:false,
        activeUser:{
          uid:null,
          color:"#303f9f",
          icon:'person',
          image:null,
          likes:null,
          permissions:0,
          username:null
        }
      }
    default:
      return state;
  }
}
