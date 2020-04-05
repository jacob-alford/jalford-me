import { useState } from 'react';

export default function useToggler(initialState = false) {
  const [isToggled, setIsToggled] = useState(false);
  return [isToggled, () => setIsToggled(!isToggled)];
}
