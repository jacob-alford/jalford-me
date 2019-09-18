import { useDispatch } from 'globalState';

import { getRandomUID } from 'functions';

const defaultConfig = {
  alertType:'info', // mui-snackbar variants
  timeoutColor:["#0F2027","#203A43","#2c5364"], // gradient stops
  timeout:10000 // ms
}

export default function useNotify(compStyle = {}){
  const addNotification = useDispatch('add','notifications');
  return notification =>
    addNotification({
      notification:{
        ...defaultConfig,
        ...compStyle,
        ...notification,
        uid:getRandomUID()
      }
    });
}
