import { useContext } from 'react';
import { GlobalState } from 'globalState';

export default function useConnect(selector) {
  const globalState = useContext(GlobalState);
  return selector(globalState);
}
