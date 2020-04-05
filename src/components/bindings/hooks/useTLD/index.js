import { useSelect, useDispatch } from 'globalState';

export default function useTLD() {
  const tldState = useSelect('getTLD');
  const toggleTld = useDispatch('toggle', 'themeMode');
  return [tldState, toggleTld];
}
