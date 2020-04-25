import { useStoreActions, useStoreState } from 'global-state';

export default function useTLD() {
  const tldState = useStoreState(state => state.theme);
  const toggleTld = useStoreActions(actions => actions.theme.toggle);
  return [tldState, toggleTld];
}
