import { useDispatch } from 'react-redux';
import useInitEffect from 'components/bindings/utilityHooks/useInitEffect';
import { INITIAL_LOAD } from 'global-state';

const usePostFetch = () => {
  const dispatch = useDispatch();
  useInitEffect(() => {
    dispatch({ type: INITIAL_LOAD });
  });
};

export default usePostFetch;
