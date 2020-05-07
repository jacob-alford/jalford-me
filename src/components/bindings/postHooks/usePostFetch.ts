import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useInitEffect from 'components/bindings/utilityHooks/useInitEffect';
import { INITIAL_LOAD } from 'global-state';

const usePostFetch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: INITIAL_LOAD });
  }, [dispatch]);
};

export default usePostFetch;
