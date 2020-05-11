import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SET_ERROR } from 'global-state';
import formatErrors from 'global-state/helpers/formatErrors';

const useError = () => {
  const dispatch = useDispatch();
  return useCallback(
    (raw: Error) => {
      console.error(raw);
      if (process.env.NODE_ENV === 'development')
        dispatch({
          type: SET_ERROR,
          payload: {
            message: formatErrors(raw),
            raw
          }
        });
      else
        dispatch({
          type: SET_ERROR,
          payload: {
            message: `Oops!  My website ran into a problem :-( check the console for details`,
            raw
          }
        });
    },
    [dispatch]
  );
};

export default useError;
