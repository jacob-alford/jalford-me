import { useStoreActions, useStoreState, THEME_TOG } from 'global-state';

export default function useTLD() {
  const tldState = useStoreState(state => state.theme);
  const toggleTld = useStoreActions({ type: THEME_TOG });
  return [tldState, toggleTld];
}
