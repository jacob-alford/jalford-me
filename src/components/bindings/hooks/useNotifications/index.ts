import { useStoreState } from 'global-state';

export default function useNotifications() {
  return useStoreState(store => store.notifications);
}
