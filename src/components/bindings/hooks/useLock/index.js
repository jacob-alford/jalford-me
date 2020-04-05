import { useRef } from 'react';

export default function useLock(initialLock = true) {
  const locked = useRef(initialLock);
  const lock = () => (locked.current = true);
  const unlock = () => (locked.current = false);
  return [locked.current, lock, unlock];
}
