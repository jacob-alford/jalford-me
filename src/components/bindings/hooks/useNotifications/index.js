import { useSelect } from 'globalState';

export default function useNotifications(){
  return useSelect('getNotifications');
}
