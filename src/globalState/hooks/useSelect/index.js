import useConnect from '../useConnect';
import { userSelectors } from 'globalState/user';
import { notifSelectors } from 'globalState/notifications';

const selectors = {
  ...userSelectors,
  ...notifSelectors
}

const getSelectors = getters => {
  if(Array.isArray(getters))
    return getters.map(getter => {
      if(!selectors[getter])
        throw new Error(`Unknown selector: ${getter}`);
      else return selectors[getter];
    });
  else if(typeof getters === 'string'){
    if(!selectors[getters])
      throw new Error(`Unknown selector: ${getters}`);
    else return selectors[getters];
  }
}

export default function useSelect(getters){
  return useConnect(getSelectors(getters));
}
