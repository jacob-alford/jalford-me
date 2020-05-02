import { useSelector } from 'react-redux';
import { globalStore } from 'global-state';

const useStoreState = (selector: (store: globalStore) => any) => useSelector(selector);

export default useStoreState;
