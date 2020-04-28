import { useMemo, useContext } from 'react';
import { GlobalStore } from '../Provider/Provider';
import { globalStoreSelector } from '../state-model/_types';

const useStoreState = (selector: globalStoreSelector) => {
  const globalStore = useContext(GlobalStore);
  return useMemo(() => selector(globalStore), [selector, globalStore]);
};

export default useStoreState;
