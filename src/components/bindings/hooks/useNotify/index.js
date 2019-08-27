import { useContext } from 'react';

import { Notifications } from '../../../../index.js';

const defaultConfig = {
  alertType:'info', // mui-snackbar variants
  timeoutColor:["#8A2387","#E94057","#F27121"], // gradient stops
  timeout:10000 // ms
}

const getRandomUID = () => (Math.random() * 100000 | 0).toString(16);

export default function useNotify(compStyle = {}){
  const { addNotification } = useContext(Notifications);
  return notification =>
    addNotification({...defaultConfig,...compStyle,...notification,uid:getRandomUID()});
}
