import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_USER, userDetails } from 'global-state';

const useUserUpdate = () => {
  const updateUser = useDispatch();
  return useCallback(
    (payload: Partial<userDetails>) =>
      updateUser({
        type: UPDATE_USER,
        payload
      }),
    [updateUser]
  );
};

export default useUserUpdate;
