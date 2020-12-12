import { useSelector } from 'react-redux';
import { globalStore } from 'global-state';

const useStoreState = <A>(selector: (store: globalStore) => A) => useSelector(selector);

export default useStoreState;
