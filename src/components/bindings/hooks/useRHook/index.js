import { useState , useEffect } from 'react';
import { useSelect } from 'globalState';

export default function useRHook(){
  const [userLoading,setUserIsLoading] = useState(true);
  const user = useSelect('getUser');
  useEffect(() => {
    if(user.hydrated) setUserIsLoading(false);
  },[userLoading,user]);
  return { userLoading , user };
}
