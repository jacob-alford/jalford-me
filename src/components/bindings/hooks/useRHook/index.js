import { useState, useEffect } from 'react';
import { useStoreState } from 'global-state';

export default function useRHook() {
  const [userLoading, setUserIsLoading] = useState(true);
  const user = useStoreState(state => state.user);
  useEffect(() => {
    if (user.hydrated) setUserIsLoading(false);
  }, [userLoading, user]);
  return { userLoading, user };
}
