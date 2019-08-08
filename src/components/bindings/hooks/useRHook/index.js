import { useState , useEffect } from 'react';
import { useSelector } from 'react-redux'

export default function useRHook(){
  const [userLoading,setUserIsLoading] = useState(true);
  const user = useSelector(state => state.user);
  useEffect(() => {
    if(user.hydrated) setUserIsLoading(false);
  },[userLoading,user]);
  return { userLoading , user };
}
