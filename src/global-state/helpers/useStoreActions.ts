import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actionPayload } from '../state-model/_types';

const useStoreActions = (payload: actionPayload) => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(payload), [payload]);
};
export default useStoreActions;
