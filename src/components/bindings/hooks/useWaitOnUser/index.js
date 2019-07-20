import React , { useState , useEffect } from 'react';

export default function useWaitOnUser(user){
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    if(isLoading && user.loggedIn) setIsLoading(false);
  },[user]);
  return isLoading;
}
