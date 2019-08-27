import React , { useReducer } from 'react';
import { Notifications } from './index.js';

const removeItem = (uid,items) => {
  return items.filter(item => item.uid !== uid);
}

const notifier = (state,action) => {
  switch(action.type){
    case 'add':
      return [action.payload.notification,...state];
    case 'remove':
      return removeItem(action.payload.uid,state);
    default:
      throw new Error("Unkown notifier action!");
  }
}

export default function NotificationProvider(props){
  const [notifications,actOnNotifications] = useReducer(notifier,[]);
  const addNotification = notification =>
    actOnNotifications({type:'add',payload:{notification}});
  const removeNotification = uid =>
    actOnNotifications({type:'remove',payload:{uid}});
  return (
    <Notifications.Provider
      value={{
        notifications,
        addNotification,
        removeNotification
      }}>
      {props.children}
    </Notifications.Provider>
  );
}
